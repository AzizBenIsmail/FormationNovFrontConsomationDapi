import React , {lazy , Suspense}from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

const Landing = lazy(()=> import("views/Landing.js")) 
const Profile = lazy(()=> import("views/Profile.js")) 
const Index = lazy(()=> import("views/Index.js")) 

ReactDOM.render(
  <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page azerty */}
      <Redirect from="*" to="/" />
    </Switch>
  </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
