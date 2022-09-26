import { Space } from "antd";
import React from "react";

interface Props {
  user: any;
}

const Balance = (props: Props) => {
  const { user } = props;
  return (
    <div>
      <Space>Balance: {`$${user.balance}`}</Space>
    </div>
  );
};

export default Balance;
