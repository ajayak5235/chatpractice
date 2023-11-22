// const User = require('../models/user-model')

// const Group = require('../models/group-model');

// const Member = require('../models/member-model');

// const sequelize = require('../util/database')


// exports.createGroup = async (req,res,next) =>{
//     const {group} = req.body;
   
//     try{
//         const groupDetails = await Group.create({name:group});
//         const member = await Member.create({
//             userId: req.body.userId,
//             groupId: groupDetails.id,
//             isAdmin:true,
//         })
//         res.sendStatus(200);
//     }
//     catch(error){
//         console.error('Error while creating group',error);
//         res.status(500).json({message:'Internal server error'});
//     }
// };

const User = require('../models/user-model');
const Group = require('../models/group-model');
const Member = require('../models/member-model');
const sequelize = require('../util/database');


const createGroup = async (req, res, next) => {
    const { group } = req.body;

    try {
        // Ensure req.body.userId is defined (set by authentication middleware)
        if (!req.body.userId) {
            return res.status(401).json({ success: false, message: 'User ID is missing' });
        }

        const groupDetails = await Group.create({ name: group });
        const member = await Member.create({
            userId: req.body.userId,
            groupId: groupDetails.id,
            isAdmin: true,
        });

        res.sendStatus(200);
    } catch (error) {
        console.error('Error while creating group', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getGroups = async (req, res, next) => {
    try {
        const groups = await req.user.getGroups();
        console.log('i am in getGroups',groups)
        if (groups.length <= 0) {
            return res.status(404).json({ message: 'You are not part of any group.' });
        }

        // Change the status code to 200 for success
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error while getting groups', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addGroupUser = async (req,res,next)=>{
    const {userID,groupID} = req.body;
    try{
        const [user,group] = await Promise.all([
            user.User.findByPk(userID),
            group.Group.findByPk(groupID)
        ]);
        if(!user || group){
            return res.status(404).json({message: user ? 'User not found' :'group does not exist'})
        }
        const exist = await group.hasUser(user);
        if(exist){
            return res.status(200).json({messsage:' User already to group!'});
        }
        await Member.create({
            UserId:user.id,
            groupId: group.id,
        });
        res.status(200).json({ message: 'User added to group' });

        }
        catch(error){
            console.error(error);
            res.status(500).json({message:'internal server'})
        }
    }
  

  const removeUser = async (req, res, next) => {
    const { groupID, deleteID } = req.query;
    const t = await sequelize.transaction();

    try {
        const rowDeleted = await Member.destroy({
            where: {
                UserId: deleteID,
                groupId: groupID,
            },
            transaction: t,
        });

        if (rowDeleted === 0) {
            await t.rollback();
            return res.status(404).json({ message: 'User not found' });
        }

        const members = await Member.findAll({
            where: {
                groupId: groupID,
            },
            transaction: t,
        });

        if (members.length === 0) {
            await Group.destroy({
                where: {
                    id: groupID,
                },
                transaction: t,
            });
        }

        await t.commit();
        res.status(200).json({ message: 'User removed from group' });

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



  const removeAdmin = async (req,res,next)=>{
    const {groupID,userID} = req.query;
    try{
        const member = await Member.findOne({
            where:{
                UserId:userID,
                groupId:groupID,
            }
        });
        if(!member){
            return res.status(404).json({message:'Group not found'})
        }
        const remainingAdmins  = await Member.findAll({
            where: {
                groupId:groupID,
                isAdmin:true,
            }
        });
        if(remainingAdmins.length ===0){
            await Group.destroy();
            return res.status(200).json({message:'Group destroyed'})
        }
        res.status(200).json({message:'demote to user!'});
    }  
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server'})
    }    
  }
  

  const makeAdmin = async (req,res,next)=>{
    const {groupID,userID} = req.query;
    try{
        const member = await Member.findOne({
            where:{
                UserId:userID,
                groupId:groupID,
            }
        });
        if(!member){
            return res.status(404).json({message:'Member does not exist'})
        }
        await member.update({isAdmin:true});
        res.status(200).json({message:'prompted to admin'})
    }
    catch(error){
        console.log('Error while making user admin!', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  module.exports = {
    createGroup,
    getGroups,
    addGroupUser,
    removeUser,
    removeAdmin,
    makeAdmin,
  }