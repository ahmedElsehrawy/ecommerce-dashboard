import {
  BarsOutlined,
  FallOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

const items = [
  {
    key: "home",
    icon: React.createElement(HomeOutlined),
    label: "Home",
    path: "/",
  },
  {
    key: "products",
    icon: React.createElement(ShopOutlined),
    label: "Products",
    path: "/products",
  },
  {
    key: "categories",
    icon: React.createElement(ReconciliationOutlined),
    label: "Categories",
    path: "/categories",
  },
  {
    key: "orders",
    icon: React.createElement(BarsOutlined),
    label: "Orders",
    path: "/orders",
  },
  {
    key: "discounts",
    icon: React.createElement(FallOutlined),
    label: "Discounts",
    path: "/discounts",
  },
  {
    key: "settings",
    icon: React.createElement(SettingOutlined),
    label: "Settings",
    path: "/settings",
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: Function;
}

const SideBar = (props: Props) => {
  const { collapsed, setCollapsed } = props;

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <CollapseContainer onClick={() => setCollapsed(!collapsed)}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
          }
        )}
      </CollapseContainer>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[`${location.pathname.slice(1)}`]}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => navigate(item.path)}
          >
            <Text>{item.label}</Text>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

const CollapseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: #fff;
  cursor: pointer;

  .trigger {
    font-size: 18px;
  }
`;
export default SideBar;
