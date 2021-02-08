import React from 'react';

import obSolutionsLogo from '../../../assets/SVGs/OBSolutions.svg';

import { Card } from 'react-bootstrap';

import './Footer.css'

const Footer = (props) => {
  const date = new Date();

  return (
    <div >
      <Card >
        <Card.Footer>
          <div className="copyrightContainer">
              <a href="https://obsolutions.co/" target="_blank" rel="noreferrer">
              <img src={obSolutionsLogo} className="obSolutionsLogo mr-3" alt="OB Solutions Logo" />
              </a>
              <p className="brandText">Copyright &copy; {date.getFullYear()}</p>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Footer;