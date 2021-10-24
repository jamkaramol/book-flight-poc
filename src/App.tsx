import React from 'react';
import './App.scss';
import Tabs from "./components/Tabs";
import NavBar from './components/NavBar';
import Flights from './pages/Flights';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { getFlags } from './appSlice';
import { useSelector } from "react-redux";
import { MdFlight } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { IoCarSharp } from "react-icons/io5";
import { CgFlagAlt, CgMenu} from "react-icons/cg";

function App(props: any) {

  const { isTabEnabled, isNavbarEnabled } = useSelector(getFlags);

  const SITE_ROUTES = [
    {
      name: "Flights",
      path: "/flights",
      component: <Flights />,
      icon: <MdFlight />
    },
    {
      name: "Hotels",
      path: "/hotels",
      component: (<div>Hotels</div>),
      icon: <FaHotel />
    },
    {
      name: "Cars",
      path: "/cars",
      component: (<div>Cars</div>),
      icon: <IoCarSharp />
    }, {
      name: "Activity",
      path: "/activity",
      component: (<div>Activity</div>),
      icon: <CgFlagAlt />
    }
  ]

  return (
    <Router>
      <div>
        {isNavbarEnabled && <NavBar logo={<CgMenu />} heading={"cxLoyalty"} />}
        {isTabEnabled && <Tabs routes={SITE_ROUTES}></Tabs>}

        <Switch>
          <Route exact path="/" render={() => {
            return <Redirect to="/flights" />
          }}>
          </Route>
          {SITE_ROUTES.map((route, index) => {
            return (<Route key={index} path={route.path} >
              {route.component}
            </Route>)
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
