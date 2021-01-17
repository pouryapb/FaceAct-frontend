import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Feeds from "./Pages/Feeds";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";

import { AuthContext } from "./Context/auth-context";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        {!token && <Redirect from="/" to="/signin" exact />}
        {token && <Redirect from="/signin" to="/feeds" exact />}
        {!token && <Route path="/signin" component={SignIn} />}
        {!token && <Route path="/signup" component={SignUp} />}
        {token && <Route path="/feeds" component={Feeds} />}
        {token && <Route path="/profile" component={Profile} />}
        <Route path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
