import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Container from "react-bootstrap/Container";

const AppContainer = () => {
  return (
    <>
      <Header />
      <main className={"main"}>
        <Container>
          <h2 className={"text-center"}>Welcome To Frickn' Fish!</h2>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AppContainer;