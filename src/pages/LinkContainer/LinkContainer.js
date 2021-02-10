import React from 'react';
import {FaGithub, FaLinkedin} from 'react-icons/fa';

import styles from './LinkContainer.module.css';

const LinkContainer = props => {
    let myStyle = {};
    if(props.center) {
        myStyle = {
            justifyContent: 'center'
        }
    }

    return <div className={styles.InfoLinkContainer} style={myStyle} >
<a className={styles.InfoLink}
    href="https://github.com/onurbilginnn?tab=repositories"
    target="_blank"
    rel="noreferrer noopener"
  >
    <FaGithub size="2em" className={styles.InfoLinkIcon} />
  </a>
  <a className={styles.InfoLink}
    href="https://www.linkedin.com/in/onur-bilgin-9134811a4/"
    target="_blank"
    rel="noreferrer noopener"
  >
    <FaLinkedin size="2em" className={styles.InfoLinkIcon} />
  </a>
</div>
};

export default LinkContainer;

