import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Feeds from "./Pages/Feeds";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/signin" exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/feeds" component={Feeds} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
