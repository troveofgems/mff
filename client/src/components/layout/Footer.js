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
    <footer className={"py-3"}>
      <Container>
        <Row>
          <Col md={6} className={'text-center py-3'}>
            <h4>Learn More About The Ocean & Conservation Efforts</h4>
            <ul>
              <li>
                Our Biggest Threat -
                <a href={"https://climate.nasa.gov"} target={"_blank"}
                   rel={"noopener noreferrer"} style={{color: "#2A9CBE"}}
                >
                Climate Change
              </a>
              </li>
              <li>
                Our Oceans
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
          <Col md={12} className={'text-center'}>
            Copyright &copy; Frickn' Fish 12/{foundingYear} {showYearRange ? ` - ${currentYear}` : false  }
          </Col>
          <Col md={12} className={'text-center py-1'}>
            1.0.0-alpha
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
