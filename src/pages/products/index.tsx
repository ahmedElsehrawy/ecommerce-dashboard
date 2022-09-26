import { useState } from "react";
import styled from "styled-components";
import { Table, Avatar, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { DELETE_PRODUCT, PRODUCT, PRODUCTS } from "../../apollo/queries";
import { AuthVar } from "../../apollo/initialState";
import CommonRow from "../../components/common/CommonRow";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type Props = {};

const Products = (props: Props) => {
  const [page, setPage] = useState(1);
  const auth = useReactiveVar(AuthVar);

  const variables = {
    where: {
      vendorId: auth.id,
    },
    skip: (page - 1) * 10,
    take: 10,
  };

  const [deleteProduct, { loading: deleteProductLoading }] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries: [{ query: PRODUCTS, variables }],
    }
  );

  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/products/${id}`}>#{id}</Link>,
    },
    {
      title: "Image",
      dataIndex: "mainImage",
      key: "mainImage",
      render: (mainImage) => <Avatar src={mainImage} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <div>{description}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{price}</div>,
    },
    {
      dataIndex: "delete",
      key: "delete",
      width: 70,
      render: (_, record: any) => (
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => handleDeleteProduct(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button loading={deleteProductLoading} type="text">
            <DeleteTwoTone twoToneColor="#eb2f96" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDeleteProduct = (id: number) => {
    deleteProduct({
      variables: {
        where: {
          id: id,
        },
      },
    });
  };

  const { data, loading } = useQuery(PRODUCTS, {
    variables,
    skip: !auth.id,
  });

  if (loading) {
    return <Loader />;
  }

  if (data?.products?.count === 0) {
    return (
      <Empty
        text="No Products Yet"
        navigationPath="/products/add"
        buttonText="Add Product"
      />
    );
  }

  return (
    <Container>
      <CommonRow
        title="Products"
        buttonAction={() => {
          navigate("/products/add");
        }}
        buttonText="Add Product"
      />
      <Table
        columns={columns}
        dataSource={data?.products?.nodes}
        loading={loading}
        bordered
        scroll={{ x: 400 }}
        pagination={
          data?.products?.count > 10
            ? {
                position: ["bottomCenter"],
                current: page,
                total: data?.products?.count,
                onChange: (pageNumber) => setPage(pageNumber),
              }
            : false
        }
      />
    </Container>
  );
};

const Container = styled.div``;

export default Products;
