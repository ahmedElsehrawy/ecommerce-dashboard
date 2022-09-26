import React from "react";
import styled, { useTheme } from "styled-components";
import { Card, Typography, Image, Input, Button, Form } from "antd";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN, RESET_PASSWORD } from "../../apollo/queries";
import { useNavigate } from "react-router-dom";
import { AuthVar } from "../../apollo/initialState";
import CustomButton from "../common/CustomButton";
import { SCREENS } from "../../constants";
import { logout } from "../../utils/auth";

interface Props {}

const ChangePassword = (props: Props) => {
  const theme = useTheme();
  const { Title } = Typography;
  const navigate = useNavigate();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const onFinish = (values: any) => {
    resetPassword({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: () => {
        logout(navigate);
      },
    });
  };

  return (
    <Container theme={theme}>
      <Form onFinish={onFinish}>
        <CustomCard>
          <Title>Reset Password</Title>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <PasswordInput placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Please input your Password" }]}
          >
            <PasswordInput placeholder="New Password" />
          </Form.Item>
          <CustomButton
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: 340 }}
          >
            Reset
          </CustomButton>
        </CustomCard>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const CustomCard = styled.div`
  width: 100%;
  padding: 77px 55px 33px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${SCREENS.md}) {
    padding: 10px;
  }

  .ant-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .ant-typography {
    font-size: 30px;
    color: #333;
    margin-bottom: 32px;
  }

  .ant-image {
    margin-bottom: 48px;
  }

  .ant-form-item {
    @media screen and (max-width: ${SCREENS.md}) {
      width: 100%;
    }
  }
`;

const PasswordInput = styled(Input.Password)`
  height: 48px;
  width: 340px;
  border-radius: 4px;
  @media screen and (max-width: ${SCREENS.md}) {
    width: 100%;
  }
`;

export default ChangePassword;
