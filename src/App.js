import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.css';

import Layout from './hoc/Layout/Layout';

const ExpoContract =  React.lazy(() => {
  return import('./containers/ExpoContract/ExpoContract');
});

const CustomContract =  React.lazy(() => {
  return import('./containers/CustomContract/CustomContract');
});

let routes = (
  <Switch>
     {/* <Route path="/contact" render={(props) => <Contact {...props}/>} />
     <Route path="/plugins" render={(props) => <Plugins {...props}/>} />
     <Route path="/services" render={(props) => <Services {...props}/>} />
     <Route path="/about" render={(props) => <About {...props}/>} /> */}
      <Route path="/custom-contract" exact component={CustomContract} />
      <Route path="/" exact component={ExpoContract} />
      <Redirect to="/" />
  </Switch>
);

function App() {
  return (
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
  );
}

export default withRouter(App);

