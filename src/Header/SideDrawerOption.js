import React from "react";
import styled from "styled-components";

function SideDrawerOption({ title, Icon }) {
  return (
    <>
      <Option>
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
  margin: 10px 0px;
  padding: 10px 0px 10px 20px;
  cursor: pointer;
  :hover {
    color: green;
    .MuiSvgIcon-root {
      color: green;
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
