import { useQuery } from "@apollo/client";
import { Tabs } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ME } from "../../apollo/queries";
import Loader from "../../components/common/Loader";
import Balance from "../../components/settings/Balance";
import ChangePassword from "../../components/settings/ChangePassword";
import Informations from "../../components/settings/Informations";

type Props = {};

const SettingsPage = (props: Props) => {
  const { search } = useLocation();

  const navigate = useNavigate();

  const [tab, setTab] = useState<string>(
    search !== null ? search.split("=")[1] : "information"
  );
  const { data, loading } = useQuery(ME);

  const handleTabChange = (tabName: string) => {
    setTab(tabName);
    navigate(`/settings?tab=${tabName}`);
  };

  if (loading) {
    return <Loader />;
  }

  const items = [
    {
      label: "Informations",
      key: "informations",
      children: <Informations user={data?.user} />,
    }, // remember to pass the key prop
    {
      label: "Balance",
      key: "balance",
      children: <Balance user={data?.user} />,
    },
    {
      label: "Change Password",
      key: "changepassword",
      children: <ChangePassword />,
    },
  ];

  return (
    <Container>
      <Tabs
        type="card"
        items={items}
        onChange={handleTabChange}
        defaultActiveKey={tab}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 0;

  .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
  }
  .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
  }
  .card-container > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
  }
  .ant-tabs-card .ant-tabs-tab,
  [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  .ant-tabs-card .ant-tabs-tab-active,
  [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }
  #components-tabs-demo-card-top .code-box-demo {
    padding: 24px;
    overflow: hidden;
    background: #f5f5f5;
  }
  [data-theme="compact"] .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -8px;
  }
  [data-theme="dark"] .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  [data-theme="dark"] #components-tabs-demo-card-top .code-box-demo {
    background: #000;
  }
  [data-theme="dark"] .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    background: #141414;
  }
  [data-theme="dark"] .ant-tabs-card .ant-tabs-tab-active {
    background: #141414;
    border-color: #141414;
  }

  /* .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    min-height: 50vh;
  } */
`;

export default SettingsPage;
