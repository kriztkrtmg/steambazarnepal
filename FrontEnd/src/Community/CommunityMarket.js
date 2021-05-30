import React from "react";

//Css import
import "./community.css";

//Material-Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types"; // Other import

//Component import
import MarketItems from "./MarketItems";
import ActiveListing from "./ActiveListing";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box span={2}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CommunityMarket() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="community">
      <div className="community__topBar">
        <h1>Community Market</h1>
        <p>
          Buy and sell items with community members for Balance and Reward
          Points.
        </p>
      </div>
      <div className="community__choice">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Market" {...a11yProps(0)} />
          <Tab label="My active Listings" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <MarketItems />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActiveListing />
      </TabPanel>
    </div>
  );
}

export default CommunityMarket;
