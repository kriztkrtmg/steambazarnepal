import React from "react";
import "./storeItem.css";
import styled from "styled-components";

function ProductHover({ name, rarity, type, hero }) {
  return (
    <span className="onHover__giveDetails">
      <HoverTitle>
        <HoverName>{name}</HoverName>
        <HoverType>
          {rarity} {type}
        </HoverType>
      </HoverTitle>
      <HoverHero>Used by: {hero}</HoverHero>
    </span>
  );
}

export default ProductHover;

const HoverTitle = styled.div`
  box-shadow: 0px 5px 8px -9px rgba(255, 255, 255, 1);
`;

const HoverName = styled.div`
  font-size: 14px;
  box-shadow: 0px 5px 8px -9px rgba(255, 255, 255, 1);
  padding: 5px 0px;
`;

const HoverType = styled.div`
  font-size: 12px;
  padding: 5px 0px;
`;

const HoverHero = styled.div`
  padding-top: 5px;
  font-size: 12px;
`;
