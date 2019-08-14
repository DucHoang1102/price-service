var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var priceController = require('../controllers/price');
var groupController = require('../controllers/group');

/*
 * api/prices
 */
routerGroup.get('/', priceController.index);

routerGroup.get('/prices', priceController.view);

routerGroup.post('/prices', priceController.new);

routerGroup.get('/prices/:id', priceController.details);

routerGroup.put('/prices/:id', priceController.update);

routerGroup.delete('/prices/:id', priceController.delete);

/*
 * api/groups
 */
routerGroup.get('/groups', groupController.view);

routerGroup.post('/groups', groupController.new);

routerGroup.get('/groups/:id', groupController.details);

routerGroup.put('/groups/:id', groupController.update);

routerGroup.delete('/groups/:id', groupController.delete);

/*
 * Entry point
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;