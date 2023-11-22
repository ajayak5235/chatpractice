// const jwt = require('jsonwebtoken')
// const User = require('../models/user-model');

// exports.authenticate = (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         const user = jwt.verify(token, 'secret')
//         User.findByPk(user.userId)
//         .then(user => {
//             //console.log(JSON.stringify(user));
//             req.user = user;
//             console.log('inauthentication')
//             next();
//         }).catch (err => {
//             console.log(err)})
//     } catch(err) {
//         console.log(err);
//         return res.status(401).json({success: false})
//     }
// }

// const jwt = require('jsonwebtoken');
// const User = require('../models/user-model');

// exports.authenticate = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         const decoded = jwt.verify(token, 'secret');
        
//         // Use async/await for better readability
//         const user = await User.findByPk(decoded.userId);

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'User not found' });
//         }

//         // Set the user ID in req.body for further use
//         req.body.userId = user.id;
//         req.user = user;

//         console.log('In authentication');
//         next();
//     } catch (err) {
//         console.error(err);
//         return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };



const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, 'secret');
        
        // Use async/await for better readability
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Set the user ID in req.body for further use
        req.body.userId = user.id;
        req.user = user;

        console.log('In authentication');
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
