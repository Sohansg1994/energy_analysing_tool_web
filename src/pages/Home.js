import * as React from 'react';
import Header from '../app/components/common/Header';
import withRoot from './modules/withRoot';
import OurServices from "./modules/views/OurServices";
import SimpleCalculator from "./modules/views/SimpleCalculator";
import Footer from "./modules/views/Footer";
import WhatWeDo from "./modules/views/WhatWeDo";
import HomeVisits from "./modules/views/HomeVisit";

function Index() {
  return (
    <React.Fragment>
      <Header/>
      {/* <Introduction/> */}
      <WhatWeDo/>
      <OurServices/>
      <HomeVisits/>
      <SimpleCalculator/>
      {/*<SubscriptionPlans/>*/}
      <Footer/>
    </React.Fragment>
  );
}

export default withRoot(Index);
