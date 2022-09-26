import React from "react";
import { Spin } from "antd";

type Props = {};

const Loader = (props: Props) => {
  return (
    <Spin
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Loader;
