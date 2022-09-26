import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import CustomButton from "./CustomButton";
import { SCREENS } from "../../constants";

const { Title } = Typography;

interface Props {
  title: string;
  buttonText: string;
  buttonAction: Function;
}

const CommonRow = (props: Props) => {
  const { buttonAction, title, buttonText } = props;
  return (
    <Row>
      <Title>{title}</Title>
      <CustomButton onClick={buttonAction} size="small">
        {buttonText}
      </CustomButton>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .ant-typography {
    font-size: 36px;

    @media screen and (max-width: ${SCREENS.sm}) {
      font-size: 24px;
    }
  }
`;

export default CommonRow;
