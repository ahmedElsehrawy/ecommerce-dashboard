import { useMutation } from "@apollo/client";
import { Form, Input, InputNumber, Switch, Typography } from "antd";
import React, { useState } from "react";
import { CREATE_DISCOUNT } from "../../../apollo/queries";
import CustomButton from "../../../components/common/CustomButton";
import CustomCard from "../../../components/common/CustomCard";
import { Container } from "../../products/add";

const { Title } = Typography;

type Props = {};

const AddDiscountPage = (props: Props) => {
  const [active, setActive] = useState(false);
  const [createDiscount, { loading }] = useMutation(CREATE_DISCOUNT);
  const onFinish = (values: any) => {
    createDiscount({
      variables: {
        input: {
          ...values,
          percent: +values.percent,
          active: active,
        },
      },
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setActive(checked);
  };
  return (
    <Container>
      <CustomCard>
        <Form onFinish={onFinish}>
          <Title>Add Discount</Title>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your Discount Name" },
            ]}
            label="Name"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="percent"
            rules={[{ required: true, message: "Please input percent" }]}
            label="Percent"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <InputNumber<string>
              style={{ width: 200 }}
              defaultValue="0"
              min="0"
              step="1"
              max="100"
              // onChange={onChange}
              stringMode
            />
          </Form.Item>

          <div style={{ marginBottom: 20 }}>
            <Switch onChange={handleSwitchChange} />
          </div>

          <CustomButton
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Add Discount
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export default AddDiscountPage;
