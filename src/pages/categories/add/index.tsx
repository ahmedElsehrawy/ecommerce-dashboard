import { useMutation } from "@apollo/client";
import { Form, Input, Typography, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_CATEGORY } from "../../../apollo/queries";
import CustomButton from "../../../components/common/CustomButton";
import CustomCard from "../../../components/common/CustomCard";
import { Container } from "../../products/add";

const { Title } = Typography;

const error = () => {
  message.error("Sorry This Category Already Exists", 4);
};

type Props = {};

const AddCategoryPage = (props: Props) => {
  const navigate = useNavigate();
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY);

  const onFinish = (values: any) => {
    createCategory({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: (data) => {
        navigate(`/categories/${data?.createCategory?.id}`);
      },
      onError: () => {
        error();
      },
    });
  };

  return (
    <Container>
      <CustomCard>
        <Form onFinish={onFinish}>
          <Title>Add Category</Title>

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
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Add Category
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export default AddCategoryPage;
