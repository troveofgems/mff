import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import mainRouter from "./router/main.router";

import './styles/App.css';
const App = () => {
  return (
   <Router>
     <Header />
      <main className={"main"}>
        <Container>
          <h1>Welcome To Frickn' Fish</h1>
          <Routes>
            {mainRouter}
          </Routes>
        </Container>
        {/*<video id="background-video" preload={"auto"}>
          <source src="img/video.mp4" type="video/mp4" />
        </video>*/}
      </main>
     <Footer />
   </Router>
  );
}

export default App;
