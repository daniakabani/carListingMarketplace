import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import NotFount from "./pages/404";
import UsersList from "./pages/users/listings";
import UsersCreate from "./pages/users/create";
import UsersEdit from "./pages/users/edit";
import UsersView from "./pages/users/view";

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/users" />
        </Route>
        <Route exact path="/users">
          <UsersList />
        </Route>
        <Route exact path="/users/new">
          <UsersCreate />
        </Route>
        <Route exact path="/users/:id">
          <UsersView />
        </Route>
        <Route exact path="/users/:id/edit">
          <UsersEdit />
        </Route>
        <Route>
          <NotFount />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;