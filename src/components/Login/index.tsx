import React from "react";
import styled, { useTheme } from "styled-components";
import { Card, Typography, Image, Input, Button, Form } from "antd";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apollo/queries";
import { useNavigate } from "react-router-dom";
import { AuthVar } from "../../apollo/initialState";
import CustomButton from "../common/CustomButton";

type Props = {};

const Login = (props: Props) => {
  const theme = useTheme();
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN);

  const onFinish = (values: any) => {
    login({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: (data) => {
        if (data?.login?.role === "VENDOR") {
          const auth = {
            id: data?.login?.id,
            email: data?.login?.email,
            token: data?.login?.token,
            role: data?.login?.role,
          };
          localStorage.setItem("auth", JSON.stringify(auth));
          AuthVar({
            isLogin: true,
            email: data?.login?.email,
            token: data?.login?.token,
            role: data?.login?.role,
            id: data?.login?.id,
          });
          navigate("/");
        }
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
            name="password"
            rules={[{ required: true, message: "Please input your Password" }]}
          >
            <PasswordInput placeholder="Password" />
          </Form.Item>
          <CustomButton
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            LOGIN
          </CustomButton>
          <Text style={{ fontSize: 13, color: "#666", marginTop: 24 }}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
