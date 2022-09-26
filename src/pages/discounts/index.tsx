import { useState } from "react";
import styled from "styled-components";
import { Table, Avatar, Button, Popconfirm, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  DELETE_DISCOUNT,
  DISCOUNTS,
  PRODUCTS,
  UPDATE_DISCOUNT,
} from "../../apollo/queries";
import { AuthVar } from "../../apollo/initialState";
import CommonRow from "../../components/common/CommonRow";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";

interface DataType {
  id: number;
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type Props = {};

const DiscountsPage = (props: Props) => {
  const [page, setPage] = useState(1);
  const auth = useReactiveVar(AuthVar);
  const [deleteDiscount, { loading: deleteDiscountLoading }] =
    useMutation(DELETE_DISCOUNT);

  const [updateDiscount, { loading: updateDiscountLoading }] =
    useMutation(UPDATE_DISCOUNT);

  const navigate = useNavigate();

  const variables = {
    skip: (page - 1) * 10,
    take: 10,
  };

  const handleDeleteDiscount = (id: number) => {
    deleteDiscount({
      variables: {
        where: {
          id: id,
        },
      },
      refetchQueries: [{ query: DISCOUNTS, variables }],
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/discounts/${id}`}>#{id}</Link>,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (percent) => <div>{percent}</div>,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active, record) => (
        <Switch
          defaultChecked={active}
          onChange={(checked) => {
            console.log(checked);
            updateDiscount({
              variables: {
                where: {
                  id: record.id,
                },
                input: {
                  active: checked,
                },
              },
            });
          }}
        />
      ),
    },
    {
      dataIndex: "delete",
      key: "delete",
      width: 70,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => handleDeleteDiscount(record?.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button loading={deleteDiscountLoading} type="text">
            <DeleteTwoTone twoToneColor="#eb2f96" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const { data, loading } = useQuery(DISCOUNTS, {
    variables,
    skip: !auth.id,
  });
  console.log("🚀 ~ file: index.tsx ~ line 75 ~ DiscountsPage ~ data", data);

  if (loading) {
    return <Loader />;
  }

  if (data?.discounts?.count === 0) {
    return (
      <Empty
        text="No Discounts Yet"
        navigationPath="/discounts/add"
        buttonText="Add Discount"
      />
    );
  }

  return (
    <Container>
      <CommonRow
        title="Discounts"
        buttonAction={() => {
          navigate("/discounts/add");
        }}
        buttonText="Add Discount"
      />
      <Table
        columns={columns}
        dataSource={data?.discounts?.nodes}
        loading={loading}
        bordered
        scroll={{ x: 400 }}
        pagination={
          data?.discounts?.count > 10
            ? {
                position: ["bottomCenter"],
                current: page,
                total: data?.discounts?.count,
                onChange: (pageNumber) => setPage(pageNumber),
              }
            : false
        }
      />
    </Container>
  );
};

const Container = styled.div``;

export default DiscountsPage;
