const express = require('express'),
  { expressCallback } = require('daniakabani/helpers')

const APIV1Routes = express.Router(),
  UsersController = require('daniakabani/controllers/users');

APIV1Routes.get('/users', expressCallback(UsersController.getAll));
APIV1Routes.get('/users/:id', expressCallback(UsersController.getByID));
APIV1Routes.post('/users', expressCallback(UsersController.create));
APIV1Routes.post('/users/:id', expressCallback(UsersController.update));
APIV1Routes.delete('/users/:id', expressCallback(UsersController.delete));

module.exports = APIV1Routes;