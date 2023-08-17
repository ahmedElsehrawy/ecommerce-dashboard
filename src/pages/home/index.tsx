import React from "react";
import styled, { useTheme } from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
//@ts-ignore
import faker from "faker";
import { Card } from "antd";
import { SCREENS } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "october",
  "november",
  "December",
];

export const linedata = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Sells",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const bardata = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Sells",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(192, 23, 45)",
      backgroundColor: "rgba(143, 21, 112, 0.5)",
    },
  ],
};

type Props = {};

const Home = (props: Props) => {
  const theme: any = useTheme();
  console.log("🚀 ~ file: index.tsx ~ line 8 ~ Home ~ theme", theme);
  return (
    <Wrapper>
      <Container>
        <LineContainer>
          <Line options={options} data={linedata} />
        </LineContainer>
        <LineContainer>
          <Bar options={options} data={bardata} />
        </LineContainer>
      </Container>
      <BarContainer>
        <Bar options={options} data={bardata} />
      </BarContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: ${SCREENS.lg}) {
    flex-direction: column;
  }
`;

const LineContainer = styled(Card)`
  width: calc(50% - 10px);
  border-radius: 8px;
  @media screen and (max-width: ${SCREENS.lg}) {
    width: 100%;
  }
`;

const BarContainer = styled(Card)`
  width: 100%;
  border-radius: 8px;
  margin-top: 34px;
`;
export default Home;
