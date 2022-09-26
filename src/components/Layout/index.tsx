import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";

import SideBar from "./sider";
import { useReactiveVar } from "@apollo/client";
import { AuthVar } from "../../apollo/initialState";
import { SCREENS } from "../../constants";

const { Content } = Layout;

interface Props {
  children: any;
}

const Page = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useLocation();
  const data = useReactiveVar(AuthVar);

  const theme: any = useTheme();

  let smallScreen = (theme?.sizes.sm || theme?.sizes.xs) && !theme?.sizes.lg;

  useEffect(() => {
    if (theme?.sizes.sm || theme?.sizes.xs) {
      if (theme?.sizes.lg) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [theme.sizes]);

  const registeration = ["/login", "/signup"];
  return !registeration.includes(router.pathname) && data?.role === "VENDOR" ? (
    <LayoutContainer>
      <Layout hasSider>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed || smallScreen ? 60 : 240 }}
        >
          <Navbar />
          <Content
            style={{
              overflow: "initial",
              minHeight: "calc(100vh - 64px)",
              padding: "24px 16px",
            }}
            onClick={() => {
              if (smallScreen) {
                setCollapsed(true);
              }
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </LayoutContainer>
  ) : (
    <LayoutContainer> {props.children}</LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  .ant-layout-sider {
    background: #1c4770;
    width: 240px !important;
    min-width: 240px !important;
    max-width: 240px !important;
  }

  .ant-layout-sider-collapsed {
    width: 60px !important;
    min-width: 60px !important;
    max-width: 60px !important;
  }

  .ant-layout-header {
    background: #ffffff;
    position: sticky;
    top: 0;
    height: 64px;
    z-index: 100;
  }

  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub > .ant-typography {
    color: rgba(255, 255, 255, 0.65);
    background: #1c4770;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: #173b5d;
  }

  .ant-menu-item {
    height: 55px;
    line-height: 55px;
  }

  .ant-menu-dark .ant-menu-item,
  .ant-menu-dark .ant-menu-item-group-title,
  .ant-menu-dark .ant-menu-item > a,
  .ant-menu-dark .ant-menu-item > span > a {
    color: #fff;
  }

  .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon + span,
  .ant-menu-dark .anticon + span > .ant-typography {
    color: #fff;
  }

  .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon + span,
  .ant-menu-dark .ant-menu-item-selected .anticon + span > .ant-typography {
    color: #a0a0ef;
  }

  .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon,
  .ant-menu-dark .ant-menu-item-selected .anticon {
    color: #a0a0ef;
  }
`;

export default Page;
