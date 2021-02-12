import React from 'react';
import {Card} from 'react-bootstrap';

import LinkContainer from '../../components/LinkContainer/LinkContainer';
import {FaAddressBook, FaMailBulk, FaPhone} from 'react-icons/fa';

import styles from './ContactContainer.module.css';

const ContactContainer = () => {  

  return ( 
     <div className={styles.ContactContainer}>   
                  
                  <Card  
                  text="dark"
                  style={{ width: '18rem' }}
    className="mb-2" >
    <Card.Body>
      <Card.Title>Contact </Card.Title>
      <Card.Text>
      <FaAddressBook /> {"Üsküdar/İstanbul, Turkey"}
      </Card.Text>
      <Card.Text>
      <FaMailBulk />
      {' '}
      <a className="ob_link" href={`mailto:onurbilginnn@gmail.com`}>
                {"onurbilginnn@gmail.com"}
              </a> 
      </Card.Text>

      <Card.Text>

      <FaPhone />
              {' '}
              <a className="ob_link" href={`tel:00905073919815`}>
                {"+90 507 391 98 15"}
              </a>
      </Card.Text>
    </Card.Body>
  </Card>
  <LinkContainer  /> 
    </div>
  );
};

export default ContactContainer;
