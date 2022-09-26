import React, { useEffect, useState } from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { createApolloClient } from "./apollo";
import "./App.css";
import { Grid, Spin } from "antd";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./components/Layout";
import Home from "./pages/home";
import { authenticatedRoutes, registerationRoutes } from "./utils/routes";
import { AuthVar } from "./apollo/initialState";
import PageNotFound from "./pages/404";

const { useBreakpoint } = Grid;

export const loading = () => (
  <Spin
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);

function App() {
  const client = createApolloClient();

  const sizes = useBreakpoint();

  const data = useReactiveVar(AuthVar);
  console.log("🚀 ~ file: App.tsx ~ line 35 ~ App ~ data", data);

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      const parsedAuth = JSON.parse(auth);
      console.log(
        "🚀 ~ file: App.tsx ~ line 39 ~ useEffect ~ parsedAuth",
        parsedAuth
      );
      AuthVar({
        isLogin: true,
        email: parsedAuth.email,
        token: parsedAuth.token,
        role: parsedAuth.role,
        id: parsedAuth.id,
      });
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme({ sizes })}>
        <Router>
          <Page>
            <React.Suspense fallback={loading()}>
              <Routes>
                {data?.role === "VENDOR" && <Route index element={<Home />} />}
                {!data.id &&
                  registerationRoutes.map((route) => (
                    <Route
                      path={route.path}
                      element={React.createElement(route.component)}
                    />
                  ))}

                {data?.role === "VENDOR" &&
                  authenticatedRoutes.map((route) => (
                    <Route
                      path={route.path}
                      element={React.createElement(route.component)}
                    />
                  ))}
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </React.Suspense>
          </Page>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
