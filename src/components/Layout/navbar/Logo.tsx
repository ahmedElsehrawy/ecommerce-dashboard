import React from "react";
import styled from "styled-components";
import { Image } from "antd";
import logo from "../../../assets/logo.png";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Container>
      <Image preview={false} width={50} src={logo} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: #fff;
`;

export default Logo;
