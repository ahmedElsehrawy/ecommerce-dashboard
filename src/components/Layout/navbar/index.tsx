import React from "react";
import { Layout, Button, Menu } from "antd";
import {
  AppstoreOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Logo from "./Logo";
import { logout, resetAuthvar } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Header className="site-layout-background" style={{ paddingLeft: 20 }}>
      <Container>
        <Logo />
        {/* <Button type="default" icon={<LogoutOutlined />} onClick={logout} /> */}
        <Menu mode="horizontal" triggerSubMenuAction="click">
          <Menu.Item
            key="logout"
            onClick={() => logout(navigate)}
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Container>
    </Header>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .ant-menu {
    font-size: 18px;
    position: absolute;
    right: 0;
  }
`;

export default Navbar;
