import React from "react";
import { useTheme } from "styled-components";

type Props = {};

const Home = (props: Props) => {
  const theme: any = useTheme();
  console.log("🚀 ~ file: index.tsx ~ line 8 ~ Home ~ theme", theme);
  return <div>Home</div>;
};

export default Home;
