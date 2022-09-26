import React from "react";
import styled, { useTheme } from "styled-components";
import { Card, Typography, Image, Input, Button, Form } from "antd";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../apollo/queries";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";

type Props = {};

const SignUp = (props: Props) => {
  const theme = useTheme();
  const { Title, Text } = Typography;
  const [register, { loading }] = useMutation(REGISTER);

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    register({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        },
      },
      onCompleted: () => {
        navigate("/login");
      },
    });
  };

  return (
    <Container theme={theme}>
      <Form onFinish={onFinish}>
        <CustomCard>
          <Title>Welcome</Title>
          <Image preview={false} src={logo} width={60} />
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your firstName" }]}
          >
            <EmailInput placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your lastName" }]}
          >
            <EmailInput placeholder="LastName" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your E-mail!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <EmailInput placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please input your Phone!" }]}
          >
            <EmailInput placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password" }]}
          >
            <PasswordInput placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="password2"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please input your Confirmed Password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <PasswordInput required placeholder="Confirm Password" />
          </Form.Item>
          <CustomButton
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            SIGN UP
          </CustomButton>
          <Text style={{ fontSize: 13, color: "#666", marginTop: 24 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </CustomCard>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.myColors.gray};
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const CustomCard = styled(Card)`
  width: 390px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
  padding: 77px 55px 33px;

  @media screen and (max-width: 768px) {
    width: 340px;
  }
  @media screen and (max-width: 576px) {
    width: 300px;
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
    margin-bottom: 16px;
  }

  .ant-image {
    margin-bottom: 48px;
  }
`;

const EmailInput = styled(Input)`
  height: 48px;
  width: 280px;
  border-radius: 4px;

  @media screen and (max-width: 576px) {
    width: 240px;
  }
`;

const PasswordInput = styled(Input.Password)`
  height: 48px;
  width: 280px;
  border-radius: 4px;
  @media screen and (max-width: 576px) {
    width: 240px;
  }
`;

export default SignUp;
