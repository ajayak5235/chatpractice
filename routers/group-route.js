const express = require('express');

const router = express.Router();
router.use(express.json());

const groupController = require('../controllers/groupController')

const authorization = require('../middleware/auth')

router.post('/addGroup',authorization.authenticate,groupController.createGroup)
router.get('/getGroup',authorization.authenticate, groupController.getGroups)
router.post('/assGroupUser',authorization.authenticate,groupController.addGroupUser)
router.delete('/removeUser',authorization.authenticate,groupController.removeUser)
router.delete('/removeAdmin',authorization.authenticate,groupController.removeAdmin)
router.get('/makeAmin',authorization.authenticate,groupController.makeAdmin)
module.exports = router;