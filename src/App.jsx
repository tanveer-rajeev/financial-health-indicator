import "./App.css";
import { Container } from "@mui/material";
import Home from "./components/home/Home";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Layout from "./Layout/Layout";
import React from "react";
import PrivateRoutes from "./components/auth/PrivateRoutes";
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="xxl">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoutes />}>
              {console.log(PrivateRoutes)};
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
