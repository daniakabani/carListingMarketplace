import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import PrivateRoute from "./pages/privateRoute";
import NotFount from "./pages/404";
import LoginPage from "./pages/login";
import UsersList from "./pages/users/listings";
import UsersCreate from "./pages/users/create";
import UsersEdit from "./pages/users/edit";
import UsersView from "./pages/users/view";
import CarList from "./pages/cars/listings";
import CarView from "./pages/cars/view";
import CarCreate from "./pages/cars/create";
import CarEdit from "./pages/cars/edit";

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/users">
          <UsersList />
        </PrivateRoute>
        <PrivateRoute exact path="/users/new">
          <UsersCreate />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:id">
          <UsersView />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:id/edit">
          <UsersEdit />
        </PrivateRoute>
        <PrivateRoute exact path="/cars">
          <CarList />
        </PrivateRoute>
        <PrivateRoute exact path="/cars/new">
          <CarCreate />
        </PrivateRoute>
        <PrivateRoute exact path="/cars/:id">
          <CarView />
        </PrivateRoute>
        <PrivateRoute exact path="/cars/:id/edit">
          <CarEdit />
        </PrivateRoute>
        <Route>
          <NotFount />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;