import { useParams } from "react-router-dom";
import { DISCOUNT, PRODUCT, UPDATE_DISCOUNT } from "../../../apollo/queries";
import { Typography, Form, Input, InputNumber, Switch } from "antd";

import { useMutation, useQuery } from "@apollo/client";
import CustomCard from "../../../components/common/CustomCard";
import CustomButton from "../../../components/common/CustomButton";

import Loader from "../../../components/common/Loader";
import { Container, LoaderContainer } from "../../products/add";
import { useEffect, useState } from "react";

const { Title } = Typography;

type Props = {};

const EditDiscountPage = (props: Props) => {
  const { id } = useParams();
  const [active, setActive] = useState(false);

  const { data, loading } = useQuery(DISCOUNT, {
    variables: {
      where: {
        id: id && +id,
      },
    },
    skip: !id,
  });

  const [updateDiscount, { loading: updateDiscountLoading }] =
    useMutation(UPDATE_DISCOUNT);

  const onFinish = async (values: any) => {
    updateDiscount({
      variables: {
        input: {
          ...values,
          percent: +values.percent,
          active: active,
        },
        where: {
          id: id && +id,
        },
      },
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setActive(checked);
  };

  useEffect(() => {
    if (data?.getDiscount) {
      setActive(data?.getDiscount?.active);
    }
  }, [data]);

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
            name: data?.getDiscount?.name,
            percent: data?.getDiscount?.percent,
          }}
        >
          <Title>Update Discount</Title>

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
            name="percent"
            rules={[{ required: true, message: "Please input percent" }]}
            label="percent"
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

          <div style={{ marginBottom: 20 }}>
            <Switch
              defaultChecked={data?.getDiscount?.active}
              onChange={handleSwitchChange}
            />
          </div>

          <CustomButton
            size="large"
            loading={loading || updateDiscountLoading}
            type="primary"
            htmlType="submit"
          >
            Update Discount
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export default EditDiscountPage;
