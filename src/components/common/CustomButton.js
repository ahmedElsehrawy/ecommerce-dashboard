import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const CustomButton = (props) => {
  return (
    <StyledButton {...props} customsize={props.size}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  width: ${(props) => (props.customsize === "large" ? "280px" : "140px")};
  height: ${(props) => (props.customsize === "large" ? "48px" : "36px")};
  background-image: linear-gradient(
    to right,
    #494e53 0%,
    #3b6ba5 51%,
    #3b6ba5 100%
  );
  border-color: transparent;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;

  @media screen and (max-width: 576px) {
    width: ${(props) => (props.size === "large" ? "240px" : "120px")};
  }

  &:hover {
    background-image: linear-gradient(
      to right,
      #494e53 0%,
      #3b6ba5 51%,
      #3b6ba5 100%
    );
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

export default CustomButton;
