import React from "react";
import styled from "styled-components";

function Backdrop({ backdropClickHandler }) {
  return <BackdropDiv onClick={backdropClickHandler}></BackdropDiv>;
}

export default Backdrop;

const BackdropDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 200;
  top: 0;
  left: 0;
`;
