import React from "react";
import styled from "styled-components";

function NotificationMessage({ id, key, image, time, message }) {
  return (
    <NotificationComponent>
      <Image src={image} alt="" />
      <Message>
        {message}
        <MessageTime>{new Date(time?.toDate()).toLocaleString()}</MessageTime>
      </Message>
    </NotificationComponent>
  );
}

export default NotificationMessage;

const NotificationComponent = styled.div`
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  font-size: 14px;
  flex: 1;
`;
const MessageTime = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: #9acd32;
`;
