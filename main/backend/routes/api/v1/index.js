const express = require('express'),
  { expressCallback } = require('daniakabani/helpers')

const APIV1Routes = express.Router(),
  UsersController = require('daniakabani/controllers/users'),
  CarsController = require('daniakabani/controllers/cars'),
  ListingsController = require('daniakabani/controllers/listings'),
  RolesController = require('daniakabani/controllers/roles');

// users routes here
APIV1Routes.get('/users', expressCallback(UsersController.getAll));
APIV1Routes.post('/users/login', expressCallback(UsersController.login));
APIV1Routes.get('/users/:id', expressCallback(UsersController.getByID));
APIV1Routes.post('/users', expressCallback(UsersController.create));
APIV1Routes.post('/users/:id', expressCallback(UsersController.update));
APIV1Routes.delete('/users/:id', expressCallback(UsersController.delete));

// cars routes here
APIV1Routes.get('/cars', expressCallback(CarsController.getAll));
APIV1Routes.get('/cars/:id', expressCallback(CarsController.getByID));
APIV1Routes.post('/cars', expressCallback(CarsController.create));
APIV1Routes.post('/cars/:id', expressCallback(CarsController.update));
APIV1Routes.delete('/cars/:id', expressCallback(CarsController.delete));

// listings routes here
APIV1Routes.get('/listings', expressCallback(ListingsController.getAll));
APIV1Routes.get('/listings/:id', expressCallback(ListingsController.getByID));
APIV1Routes.post('/listings/:id', expressCallback(ListingsController.update));
APIV1Routes.post('/listings', expressCallback(ListingsController.create));
APIV1Routes.delete('/listings/:id', expressCallback(ListingsController.delete));

// roles routes here
APIV1Routes.get('/roles', expressCallback(RolesController.getAll));
APIV1Routes.get('/roles/:id', expressCallback(RolesController.getRoleByID));


module.exports = APIV1Routes;