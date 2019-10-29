var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var priceController = require('../controllers/price');
var groupController = require('../controllers/group');
var checkController = require('../controllers/check');
var nextController  = require('../controllers/next');
var preController   = require('../controllers/pre');

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
 * api/check
 */
routerGroup.get('/check', checkController.check);

/*
 * api/next
 */
routerGroup.put('/next', nextController.next);

/*
 * api/pre
 */
routerGroup.put('/pre', preController.pre);

/*
 * Entry point
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;