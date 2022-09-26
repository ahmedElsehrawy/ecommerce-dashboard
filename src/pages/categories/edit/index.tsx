import { useParams } from "react-router-dom";
import {
  CATEGORY,
  PRODUCT,
  UPDATE_CATEGORY,
  UPDATE_PRODUCT,
} from "../../../apollo/queries";
import { Typography, Form, Input, InputNumber } from "antd";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../apollo/queries";
import CustomCard from "../../../components/common/CustomCard";
import CustomButton from "../../../components/common/CustomButton";
import CustomSelect from "../../../components/common/CustomSelect";

import Loader from "../../../components/common/Loader";
import { Container, LoaderContainer } from "../../products/add";

const { Title } = Typography;

type Props = {};

const EditCategoryPage = (props: Props) => {
  const { id } = useParams();

  const { data, loading } = useQuery(CATEGORY, {
    variables: {
      where: {
        id: id && +id,
      },
    },
    skip: !id,
  });
  console.log("🚀 ~ file: index.tsx ~ line 35 ~ EditCategoryPage ~ data", data);

  const [updateCategory, { loading: updataCategoryLoading }] =
    useMutation(UPDATE_CATEGORY);

  const onFinish = async (values: any) => {
    updateCategory({
      variables: {
        input: {
          ...values,
        },
        where: {
          id: id && +id,
        },
      },
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
            name: data?.getOneCategory?.name,
          }}
        >
          <Title>Update Category</Title>

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

          <CustomButton
            size="large"
            loading={loading || updataCategoryLoading}
            type="primary"
            htmlType="submit"
          >
            Update Caetgory
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export default EditCategoryPage;
