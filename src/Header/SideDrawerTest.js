import React from "react";
import "./sidedrawer.css";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

function SideDrawer({ show }) {
  const history = useHistory();
  return (
    <div className={`slide_drawer ${show && "animate_slide"}`}>
      <List component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText
            primary="Store Market"
            onClick={() => history.push("/storemarket")}
            className="drawer_link"
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Community Market"
            onClick={() => history.push("/community")}
            className="drawer_link"
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Inventory"
            onClick={() => history.push("/inventory")}
            className="drawer_link"
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Sell"
            onClick={() => history.push("/sell")}
            className="drawer_link"
          />
        </ListItem>
        <h4>
          Sidedrawer is not complete yet....Better try this project in desktop
          mode...
        </h4>
      </List>
    </div>
  );
}

export default SideDrawer;
