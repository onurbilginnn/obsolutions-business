import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import './App.css';

import Layout from './hoc/Layout/Layout';

const ExpoContract = React.lazy(() => {
  return import('./containers/AreaContract/AreaContract');
});

const CustomContract = React.lazy(() => {
  return import('./containers/CustomContract/CustomContract');
});

const ContactPage = React.lazy(() => {
  return import('./pages/Contact/Contact');
});


const HomePage = React.lazy(() => {
  return import('./pages/Home/Home');
});


let routes = (
  <Switch>
    <Route path="/contact" exact component={ContactPage} />
    <Route path="/custom-contract" exact component={CustomContract} />
    <Route path="/area-contract" exact component={ExpoContract} />
    <Route path="/" exact component={HomePage} />
    <Redirect to="/" />
  </Switch>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <HashRouter basename={process.env.PUBLIC_URL} >
          {routes}
        </HashRouter>
      </Suspense>
    </Layout>
  );
}

export default withRouter(App);

