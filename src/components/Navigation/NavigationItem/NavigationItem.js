import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const TopNavBar = (props) => {
 
  return (
    <div className={styles.NavigationItem + " " + props.classes}>  
      <NavLink       
       to={props.link}
       exact={props.exact}
       activeClassName={styles.active} >{props.children}</NavLink>
    </div>
  );
}

export default TopNavBar;