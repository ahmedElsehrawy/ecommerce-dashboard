import { Space } from "antd";
import React from "react";
import styled from "styled-components";

interface Props {
  user: any;
}

const Informations = (props: Props) => {
  const { user } = props;
  return (
    <Container>
      <Space direction="vertical">
        <Space>Name: {`${user.firstName} ${user.lastName}`}</Space>
        <Space>email: {user.email}</Space>
        <Space>phone: {user.phone}</Space>
        {user.role === "VENDOR" && <Space>Role: VENDOR</Space>}
      </Space>
    </Container>
  );
};

const Container = styled.div``;

export default Informations;
