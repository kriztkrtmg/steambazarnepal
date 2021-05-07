import React from "react";
import styled from "styled-components";

function SideDrawerOption({ title, Icon, clickMe }) {
  return (
    <>
      <Option onClick={clickMe}>
        <Icon />
        <Title>{title}</Title>
      </Option>
    </>
  );
}

export default SideDrawerOption;

const Option = styled.div`
  box-shadow: 0px 5px 8px -9px rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  margin: 7px 0px;
  padding: 7px 0px 7px 20px;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.7);
    color: #000;
    .MuiSvgIcon-root {
      color: #000;
    }
  }
  .MuiSvgIcon-root {
    font-size: x-large;
    color: #9acd32;
  }
`;

const Title = styled.div`
  margin-left: 10px;
  text-transform: capitalize;
  font-weight: 700;
`;
