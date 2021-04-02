import React from "react";
import "./sidedrawer.css";
import SideDrawerOption from "./SideDrawerOption";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
//import DeckRoundedIcon from "@material-ui/icons/DeckRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailIcon from "@material-ui/icons/Email";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { selectUser, selectPhoto } from "../features/user/userSlice";
import StyleIcon from "@material-ui/icons/Style";

function SideDrawer({ show, handleLogin }) {
  const user = useSelector(selectUser);
  const photo = useSelector(selectPhoto);

  return (
    <div className={`slide_drawer ${show && "animate_slide"}`}>
      <SideDrawerOption title="marketplace" Icon={StoreRoundedIcon} />
      <SideDrawerOption title="inventory" Icon={StyleIcon} />
      <SideDrawerOption title="sell" Icon={LocalAtmIcon} />
      <SideDrawerOption title="support" Icon={EmailIcon} />
      <SideDrawerOption title="guide" Icon={ContactSupportIcon} />

      {!user ? (
        <div className="account__Null" onClick={handleLogin}>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png"
            alt="logo"
          />
        </div>
      ) : (
        <>
          <div className="account__balance">
            <div>
              <NumberFormat
                value={12345}
                displayType="text"
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={"Balance = Rs: "}
                suffix={" /-"}
              />
            </div>
            <IconButton size="small">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="account__profile">
            <img src={photo} alt="facebook Logo" />
            <div className="account__name">
              <div>{user}</div>
              <ArrowDropDownIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SideDrawer;
