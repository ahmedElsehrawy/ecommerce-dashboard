import React, { Children } from "react";
import styled from "styled-components";
import { Card } from "antd";

interface Props {
  children: any;
}

const CustomCard = (props: Props) => {
  const { children } = props;
  return (
    <Container>
      <Card>{children}</Card>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .ant-card {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
    padding: 24px;
  }
`;
export default CustomCard;
