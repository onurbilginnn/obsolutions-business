import React from 'react';

import TopNavBar from '../../components/Navigation/TopNavBar/TopNavBar';
import Footer from '../../components/Navigation/Footer/Footer';

import styles from './Layout.module.css';

const Layout = props => {
  return (<>
      <TopNavBar />
    <div className={styles.MainContainer}>
    {props.children}
      <Footer />
    </div>
  </>
  );
}

export default Layout;