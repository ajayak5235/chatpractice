const User = require("../models/user-model");
const Group = require("../models/group-model");
const Member = require("../models/member-model");
const Message = require('../models/msg-model')
//const S3Services = require("../services/s3Services");


const addMessage = (io) => {
    
    return async (req, res, next) => {
        const { groupID, message } = req.body;
        console.log('>>>>>>>>>>>',message)
        const file = req.file;
        
        try {
            const user = await Member.findOne({
                where: {
                    groupId: groupID,
                    UserId: req.user.id,
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'You are not part of the group anymore' });
            }

            const chatMessage = {}; // Define chatMessage as an empty object
              console.log(chatMessage)
            const saveMessage = {
                groupId: groupID,
            };

            if (file) {
                const filename = `${Date.now()}_${req.user.id}_${file.originalname}`;
                const url = await s3Services(file, filename); // Replace yield with await
                chatMessage.File = url;
                saveMessage.file = url;
            }

            if (message) {
                chatMessage.message = message;
                saveMessage.message = message;
            }

            io.emit('chat message', chatMessage);
            
             await req.user.createMessage(saveMessage);
            // await req.user.createMsg(saveMessage);


            res.status(201).json({ message: 'Message saved to the database' });
        } catch (error) {
            console.log('Error while storing message: ', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};






// const getMessages = async (req, res, next) => {
//     try {
//         // Destructure groupID from req.params with a default value of null
//         const { groupID = null } = req.params;

//         // Check if groupID is not present in the request
//         if (groupID === null) {
//             return res.status(400).json({ message: 'Missing groupID in the request' });
//         }

//         const member = await Member.findOne({
//             where: {
//                 UserId: req.user.id,
//                 groupId: groupID,
//             },
//         });

//         const isadmin = member?.isAdmin; 

//         const group = await Group.findByPk(groupID); 

//         if (!group) {
//             return res.status(404).json({ message: 'Group does not exist anymore' });
//         }

//         const messages = await group.getMessages({
//             include: [
//                 {
//                     model: User.User,
//                     attributes: ['name'],
//                 },
//             ],
//         });

//         if (messages.length <= 0) {
//             return res.status(404).json({
//                 message: 'No messages in the group!',
//                 groupDetails: group,
//                 isAdmin: isadmin,
//             });
//         }

//         res.status(200).json({
//             messages: messages,
//             groupDetails: group,
//             isAdmin: isadmin,
//         });
//     } catch (error) {
//         console.log('Error while getting messages: ', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };



const getMessages = async (io, req, res) => {
    try {
        const { groupID = null } = req.params;

        if (groupID === null) {
            return res.status(400).json({ message: 'Missing groupID in the request' });
        }

        const member = await Member.findOne({
            where: {
                UserId: req.user.id,
                groupId: groupID,
            },
        });

        const isadmin = member?.isAdmin;
        const group = await Group.findByPk(groupID);

        if (!group) {
            return res.status(404).json({ message: 'Group does not exist anymore' });
        }

        const messages = await group.getMessages({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
         });

        if (messages.length <= 0) {
            return res.status(404).json({
                message: 'No messages in the group!',
                groupDetails: group,
                isAdmin: isadmin,
            });
        }

        res.status(200).json({
            messages: messages,
            groupDetails: group,
            isAdmin: isadmin,
        });

        // Emitting messages to the socket.io room
        io.to(groupID).emit('messages', messages);
    } catch (error) {
        console.log('Error while getting messages: ', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};








// const getMessages = async (io, req, res) => {
//     try {
//         const { groupID = null } = req.params;

//         if (groupID === null) {
//             return res.status(400).json({ message: 'Missing groupID in the request' });
//         }

//         const member = await Member.findOne({
//             where: {
//                 UserId: req.user.id,
//                 groupId: groupID,
//             },
//         });

//         const isadmin = member?.isAdmin;

//         // Find the group by ID
//         const group = await Group.findByPk(groupID);

//         if (!group) {
//             return res.status(404).json({ message: 'Group does not exist anymore' });
//         }

//         // Assuming there's an association between Group and Msg models
//         const messages = await group.getMessages({
//             include: [
//                 {
//                     model: User.User,
//                     attributes: ['name'], // Adjust this based on your User model attributes
//                 },
//             ],
//         });

//         if (messages.length <= 0) {
//             return res.status(404).json({
//                 message: 'No messages in the group!',
//                 groupDetails: group,
//                 isAdmin: isadmin,
//             });
//         }

//         res.status(200).json({
//             messages: messages,
//             groupDetails: group,
//             isAdmin: isadmin,
//         });

//         // Emitting messages to the socket.io room
//         io.to(groupID).emit('messages', messages);
//     } catch (error) {
//         console.log('Error while getting messages: ', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };
 
















// const getByEmail = async (req, res, next) => {
//     const { userEmail } = req.query;

//     try {
//         const user = await User.findOne({
//             where: { email: userEmail },
//             attributes: ['id', 'name'],
//         });

//         if (user) {
//             return res.status(200).json({ user: user });
//         }

//         // No need to check if user is null, just return the 404 response
//         return res.status(404).json({ message: 'No user exists' });
//     } catch (error) {
//         console.log('Error while finding user: ', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };



const getByEmail = async (io, req, res, next) => {
    const { userEmail } = req.query;

    try {
        const user = await User.findOne({
            where: { email: userEmail },
            attributes: ['id', 'name'],
        });

        if (user) {
            res.status(200).json({ user: user });

            // Emitting user data to the socket.io room
            io.emit('user', user);
        } else {
            res.status(404).json({ message: 'No user exists' });
        }
    } catch (error) {
        console.log('Error while finding user: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};







// const showGroupUsers = async (req, res, next) => {
//     const { groupID } = req.query;

//     try {
//         const members = await Group.findByPk(groupID, {
//             include: [
//                 {
//                     model: User.User,
//                     attributes: ['id', 'name'],
//                     through: {
//                         attributes: ['isAdmin'],
//                     },
//                 },
//             ],
//         });

//         if (!members || members.length === 0) {
//             return res.status(404).json({ message: 'No users are added to the group' });
//         }

//         res.status(200).json({ users: members });
//     } catch (error) {
//         console.log('Error while fetching group users: ', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };





const showGroupUsers = async (io, req, res, next) => {
    const { groupID } = req.query;

    try {
        const members = await Group.findByPk(groupID, {
            include: [
                {
                    model: User.User,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: ['isAdmin'],
                    },
                },
            ],
        });

        if (!members || members.length === 0) {
            return res.status(404).json({ message: 'No users are added to the group' });
        }

        res.status(200).json({ users: members });

        // Emitting group users data to the socket.io room
        io.emit('groupUsers', { groupID, users: members });
    } catch (error) {
        console.log('Error while fetching group users: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = {
    addMessage,
    getMessages,
    getByEmail,
    showGroupUsers,
}