import React, { useEffect, useState } from "react";

import db from "../CONFIG";
import NotificationMessage from "./NotificationMessage";

function Notification() {
  const [notificationMessage, setNotificationMessage] = useState([]);

  useEffect(() => {
    db.collection("notification")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) =>
        setNotificationMessage(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <>
      {notificationMessage.map((item) => (
        <NotificationMessage
          id={item.id}
          key={item.id}
          image={item.data.image}
          time={item.data.time}
          message={item.data.message}
        />
      ))}
    </>
  );
}

export default Notification;
