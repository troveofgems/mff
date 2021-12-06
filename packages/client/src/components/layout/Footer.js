import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  const
    currentYear = new Date().getFullYear(),
    foundingYear = 2021,
    showYearRange = (currentYear !== foundingYear);
  return (
    <footer>
      <Container>
        <Row>
          <Col md={6} className={'text-center py-3'}>
            <h4>Learn More About The Ocean & Conservation Efforts</h4>
            <ul>
              <li>
                Our Biggest Threat - Climate Change
                {/*https://climate.nasa.gov*/}
              </li>
              <li>
                Our Oceans by Oceana
                {/*https://oceana.org*/}
              </li>
            </ul>
          </Col>
          <Col md={6} className={'text-center py-3'}>
            <h4>Get To Know Us</h4>
            <ul>
              <li>About Frickn' Fish</li>
              <li>Contact Us</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className={'text-center py-3'}>
            Copyright &copy; Frickn' Fish {foundingYear} {showYearRange ? ` - ${currentYear}` : false  }
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
