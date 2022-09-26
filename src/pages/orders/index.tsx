import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Space, Table, Tag, Avatar, Row, Col, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery, useReactiveVar } from "@apollo/client";
import { ORDERS, PRODUCTS } from "../../apollo/queries";
import { AuthVar } from "../../apollo/initialState";
import CustomButton from "../../components/common/CustomButton";
import CommonRow from "../../components/common/CommonRow";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Empty from "../../components/common/Empty";
import Loader from "../../components/common/Loader";

const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (id) => <a>#{id}</a>,
  },
  {
    title: "user Id",
    dataIndex: "user",
    key: "user",
    render: (user) => <a>#{user.id}</a>,
  },
  {
    title: "user Name",
    dataIndex: "user",
    key: "user",
    render: (user) => (
      <a>
        #{user.firstName} {user.lastName}
      </a>
    ),
  },
  {
    title: "totalPrice",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (totalPrice) => <div>${totalPrice}</div>,
  },

  {
    title: "Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (orderStatus) => <div>{orderStatus}</div>,
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => <div>{moment(createdAt, "YYYYMMDD").fromNow()}</div>,
  },
  {
    dataIndex: "delete",
    key: "delete",
    width: 70,
    render: () => (
      <div style={{ textAlign: "center" }}>
        <DeleteOutlined />
      </div>
    ),
  },
];

type Props = {};

const OrdersPage = (props: Props) => {
  const [page, setPage] = useState(1);
  const auth = useReactiveVar(AuthVar);

  const navigate = useNavigate();

  const { data, loading } = useQuery(ORDERS, {
    variables: {
      skip: (page - 1) * 10,
      take: 10,
    },
    skip: !auth.id,
  });

  if (loading) {
    return <Loader />;
  }

  if (data?.vendorOrders?.count === 0) {
    return (
      <Empty
        text="No Orders Yet"
        navigationPath="/orders/add"
        // buttonText="Add Order"
      />
    );
  }

  return (
    <Container>
      <Title>Orders</Title>
      <Table
        columns={columns}
        dataSource={data?.vendorOrders?.nodes}
        loading={loading}
        bordered
        scroll={{ x: 400 }}
        pagination={
          data?.vendorOrders?.count > 10
            ? {
                position: ["bottomCenter"],
                current: page,
                total: data?.vendorOrders?.count,
                onChange: (pageNumber) => setPage(pageNumber),
              }
            : false
        }
      />
    </Container>
  );
};

const Container = styled.div`
  .ant-typography {
    margin-bottom: 48px;
  }
`;

export default OrdersPage;
