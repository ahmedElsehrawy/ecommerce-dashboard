import { useParams } from "react-router-dom";
import { PRODUCT, UPDATE_PRODUCT } from "../../../apollo/queries";
import { Container, LoaderContainer } from "../add";
import { Typography, Form, Input, InputNumber } from "antd";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../apollo/queries";
import CustomCard from "../../../components/common/CustomCard";
import CustomButton from "../../../components/common/CustomButton";
import CustomSelect from "../../../components/common/CustomSelect";

import Loader from "../../../components/common/Loader";

const { Title } = Typography;

type Props = {};

const EditProductPage = (props: Props) => {
  const { id } = useParams();
  const [getCategoriees, { data: categories }] = useLazyQuery(CATEGORIES);

  const { data, loading } = useQuery(PRODUCT, {
    variables: {
      where: {
        id: id && +id,
      },
    },
    skip: !id,
  });

  const [updateProduct, { loading: updateProductLoading }] =
    useMutation(UPDATE_PRODUCT);

  const onFinish = async (values: any) => {
    updateProduct({
      variables: {
        input: {
          ...values,
          price: +values.price,
        },
        productId: {
          id: id && +id,
        },
      },
      refetchQueries: [
        {
          query: PRODUCT,
          variables: {
            where: {
              id: id && +id,
            },
          },
        },
      ],
    });
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <CustomCard>
        <Form
          onFinish={onFinish}
          initialValues={{
            name: data?.product?.name,
            description: data?.product?.description,
            price: data?.product?.price,
            categoryId: data?.product?.category?.id,
          }}
        >
          <Title>Update Product</Title>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your Product Name" },
            ]}
            label="Name"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input Product Description" },
            ]}
            label="Description"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input price" }]}
            label="Price"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <InputNumber<string>
              style={{ width: 200 }}
              defaultValue="0"
              min="0"
              step="1"
              // onChange={onChange}
              stringMode
            />
          </Form.Item>
          <Form.Item
            name="categoryId"
            // rules={[{ required: true, message: "Please input category" }]}
            label="Category"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <CustomSelect
              values={categories?.categories?.nodes}
              defaultValue={data?.product?.category}
              placeholder="select a category"
              onChange={(values: any) => {
                console.log("change", values);
              }}
              onSearch={(search: string) => {
                if (search.trim() !== "") {
                  getCategoriees({
                    variables: {
                      skip: 0,
                      take: 10,
                      name: search,
                    },
                  });
                }
              }}
            />
          </Form.Item>

          <CustomButton
            size="large"
            loading={loading || updateProductLoading}
            type="primary"
            htmlType="submit"
          >
            Update Product
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export default EditProductPage;
