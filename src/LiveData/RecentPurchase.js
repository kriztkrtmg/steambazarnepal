import React from "react";

import NumberFormat from "react-number-format";

import Popover from "@material-ui/core/Popover";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
}));

function RecentPurchase({
  id,
  image,
  name,
  RpOrBal,
  price,
  rarity,
  type,
  time,
  userImg,
  source,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <>
          <Typography
            {...bindTrigger(popupState)}
            className="recentPurchase"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <img src={image} alt="" />
          </Typography>
          <Popover
            {...bindPopover(popupState)}
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <div className="recentPurchase__detail">
              <div className="purchased__top">
                <div className="purchased__itemName">{name}</div>
                <div className="purchased__itemRarity">
                  {rarity} {type}
                </div>
              </div>
              <div className="purchased__middle">
                <div className="purchased__itemPrice">
                  {RpOrBal ? (
                    <NumberFormat
                      value={price}
                      displayType="text"
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"Rs: "}
                      suffix={" /-"}
                    />
                  ) : (
                    <NumberFormat
                      value={price}
                      displayType="text"
                      suffix={" RP"}
                    />
                  )}
                </div>
                <div className="purchased__source">{source} purchase</div>
              </div>
              <div className="purchased__bottom">
                <div className="purchased__person">
                  Purchased By :
                  <Avatar src={userImg} />
                </div>
                <div className="purchased__date">
                  <p>Purchase Date :</p>{" "}
                  {new Date(time?.toDate()).toLocaleString()}
                </div>
              </div>
            </div>
          </Popover>
        </>
      )}
    </PopupState>
  );
}

export default RecentPurchase;
