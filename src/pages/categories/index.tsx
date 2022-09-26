import React, { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  Space,
  Table,
  Tag,
  Avatar,
  Row,
  Col,
  Button,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { CATEGORIES, DELETE_CATEGORY, PRODUCTS } from "../../apollo/queries";
import { AuthVar } from "../../apollo/initialState";
import CustomButton from "../../components/common/CustomButton";
import CommonRow from "../../components/common/CommonRow";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import { DeleteTwoTone } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type Props = {};

const CategoriesPage = (props: Props) => {
  const [page, setPage] = useState(1);
  const auth = useReactiveVar(AuthVar);

  const variables = {
    skip: (page - 1) * 10,
    take: 10,
  };

  const [deleteCategory, { loading: deleteCategoryLoading }] = useMutation(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: CATEGORIES, variables }],
    }
  );

  const handleDeleteCategory = (id: number) => {
    deleteCategory({
      variables: {
        where: {
          id: id,
        },
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/categories/${id}`}>#{id}</Link>,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <div>{name}</div>,
    },
    {
      dataIndex: "delete",
      key: "delete",
      width: 70,
      render: (_, record: any) =>
        record.ownerId === auth.id ? (
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button loading={deleteCategoryLoading} type="text">
              <DeleteTwoTone twoToneColor="#eb2f96" />
            </Button>
          </Popconfirm>
        ) : (
          <Button loading={deleteCategoryLoading} type="text" disabled={true}>
            <DeleteTwoTone twoToneColor="#ccc" />
          </Button>
        ),
    },
  ];

  const navigate = useNavigate();

  const { data, loading } = useQuery(CATEGORIES, {
    variables,
    skip: !auth.id,
  });
  console.log("🚀 ~ file: index.tsx ~ line 100 ~ CategoriesPage ~ data", data);

  if (loading) {
    return <Loader />;
  }

  if (data?.categories?.count === 0) {
    return (
      <Empty
        text="No Categories Yet"
        navigationPath="/categories/add"
        buttonText="Add Category"
      />
    );
  }

  return (
    <Container>
      <CommonRow
        title="Categories"
        buttonAction={() => {
          navigate("/categories/add");
        }}
        buttonText="Add Category"
      />
      <Table
        columns={columns}
        dataSource={data?.categories?.nodes}
        loading={loading}
        bordered
        scroll={{ x: 400 }}
        pagination={
          data?.categories?.count > 10
            ? {
                position: ["bottomCenter"],
                current: page,
                total: data?.categories?.count,
                onChange: (pageNumber) => setPage(pageNumber),
              }
            : false
        }
      />
    </Container>
  );
};

const Container = styled.div``;

export default CategoriesPage;
