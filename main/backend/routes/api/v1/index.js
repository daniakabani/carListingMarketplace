const express = require('express');

const APIV1Routes = express.Router(),
  UsersController = require('daniakabani/controllers/users');

APIV1Routes.get('/users', UsersController.getAll);
APIV1Routes.get('/', (req, res) => res.send('hi!') );

module.exports = APIV1Routes;