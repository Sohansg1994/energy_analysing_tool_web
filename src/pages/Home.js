import * as React from 'react';
import Introduction from './modules/views/Introduction';
import Header from './modules/views/Header';
import withRoot from './modules/withRoot';
import OurServices from "./modules/views/OurServices";
import SimpleCalculator from "./modules/views/SimpleCalculator";
import Footer from "./modules/views/Footer";
import HomeVisits from "./modules/views/HomeVisit";

function Index() {
  return (
    <React.Fragment>
      <Header/>
      <Introduction/>
      {/*<WhatWeDo/>*/}
      <OurServices/>
      {/*<HomeVisits/>*/}
      <SimpleCalculator/>
      {/*<SubscriptionPlans/>*/}
      
      <Footer/>
    </React.Fragment>
  );
}

export default withRoot(Index);
