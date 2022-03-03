const Router = require('express').Router;
const accountController = require('../controllers/account-controller');
const emailController = require('../controllers/email-controller');
const proxyController = require('../controllers/proxy-controller');
const router = new Router();

router.post('/accounts', accountController.add);
router.delete('/accounts', accountController.delete);
router.get('/accounts', accountController.getAll);
router.put('/accounts', accountController.update);

router.post('/proxy', proxyController.add);
router.delete('/proxy', proxyController.delete);
router.put('/proxy', proxyController.update);
router.get('/proxy', proxyController.getAll);

router.post('/email', emailController.add);
router.delete('/email', emailController.delete);
router.put('/email', emailController.update);
router.get('/email', emailController.getAll);

module.exports = router;
