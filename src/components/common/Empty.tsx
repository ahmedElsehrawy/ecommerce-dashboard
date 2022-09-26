import { Button, Image, Typography } from "antd";
import EmptyImage from "../../assets/empty_cart.svg";

//@ts-ignore
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
interface Props {
  text: string;
  buttonText?: string;
  navigationPath: string;
}

const Empty = (props: Props) => {
  const { text, buttonText, navigationPath } = props;
  const navigate = useNavigate();
  return (
    <Content>
      <Image width={300} src={EmptyImage} alt="empty image" preview={false} />
      <Typography.Title>{text}</Typography.Title>
      {buttonText && (
        <CustomButton
          onClick={() => {
            navigate(navigationPath);
          }}
          size="large"
        >
          {buttonText}
        </CustomButton>
      )}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ant-typography {
    margin-top: 24px;
  }
`;

export default Empty;
