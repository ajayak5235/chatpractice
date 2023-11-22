
const express = require('express');
const userAuthenticate = require('../middleware/auth');
const msgController = require('../controllers/msgController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

function MessageRoutes(io) {
    router.post('/message', userAuthenticate.authenticate, upload.single('file'), (req, res) => {
        msgController.addMessage(io, req, res);
    });

    router.get('/getMessages/:groupID', userAuthenticate.authenticate, (req, res) => {
        msgController.getMessages(io, req, res); // Ensure res is being passed correctly
    });

    router.get('/searchUser', userAuthenticate.authenticate, (req, res) => {
        msgController.getByEmail(io, req, res);
    });

    router.get('/showGroupUsers', userAuthenticate.authenticate, (req, res) => {
        msgController.showGroupUsers(io, req, res);
    });

    return router;
}

module.exports = MessageRoutes;
