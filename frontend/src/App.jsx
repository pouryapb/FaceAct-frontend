import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";

import { AuthContext } from "./Context/auth-context";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        {!token && <Redirect from="/" to="/signin" exact />}
        {!token && <Redirect from="/home" to="/signin" exact />}
        {token && <Redirect from="/signin" to="/home" exact />}
        {token && <Redirect from="/" to="/home" exact />}
        {!token && <Route path="/signin" component={SignIn} />}
        {!token && <Route path="/signup" component={SignUp} />}
        {token && <Route path="/home" component={Home} />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
