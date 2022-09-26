import styled from "styled-components";
import { Image, Button } from "antd";
import notFoundImage from "../../assets/404.svg";
import { useReactiveVar } from "@apollo/client";
import { AuthVar } from "../../apollo/initialState";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {};

const PageNotFound = (props: Props) => {
  const data = useReactiveVar(AuthVar);
  const navigate = useNavigate();
  const location = useLocation();

  if (!data?.isLogin) {
    if (location.pathname !== "/signup") {
      navigate("/login");
    }
  }

  return (
    <Container>
      {data?.id && (
        <>
          <Image src={notFoundImage} preview={false} />
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .ant-btn {
    margin-top: 24px;
  }
`;

export default PageNotFound;
