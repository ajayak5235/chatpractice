//  //require('dotenv').config();
//  const express  = require('express');
//  const bodyParser = require('body-parser');
//  const sequelize = require('./util/database')
// const http = require("http");
//  const cors = require('cors')
// const initializeSocket = require("./util/socket");
// const cron = require("node-cron");
// const cronJob = require("./services/cronjob");

// const app = express();

// app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));

// const userRoutes = require('./routers/user-route');
// const msgRouter = require('./routers/msg-router');
// const groupRouter = require('./routers/group-route')


// app.use(cors());
// app.use(express.json());


// const httpServer = http.createServer(app);
// const io = initializeSocket(httpServer);

// app.use(express.json());
// app.use(cors({
//     origin: '*',
//     credentials: true,
// }));

// app.use(express.static('public'));

// const User = require('./models/user-model')
// const Msg = require('./models/msg-model')
// const Group = require('./models/group-model')
// const Member = require('./models/member-model')

// app.use('/user', userRoutes)
// app.use('/user',msgRouter(io))
// app.use('/user',groupRouter)

//  cron.schedule('0 0 * * *', async () => {
//       try {
//           await cronJob.runJob();
//       } catch (error) {
//           console.log('Error in cron job schedule', error);
//       }
//   }, {
//       timezone: 'Asia/Kolkata',
//   });

// User.hasMany(Msg);
// Msg.belongsTo(User);

// User.belongsToMany(Group, { through: Member});
// Group.belongsToMany(User, { through: Member});

// Group.hasMany(Msg, { constraints: true, onDelete: 'CASCADE' });
// Msg.belongsTo(Group);
// sequelize
//   .sync()
//   .then(() => {
//     httpServer.listen(4000, () => {
//       console.log('Server is running on port 4000');
//     });
//   })
//   .catch((err) => console.log(err));



// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const cors = require('cors');
// const initializeSocket = require('./util/socket');
// const cron = require('node-cron');
// const cronJob = require('./services/cronjob');
// const sequelize = require('./util/database');

// const app = express();
// const httpServer = http.createServer(app);
// const io = initializeSocket('http://localhost:4000'); // Move io creation outside the sequelize.sync block

// app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// const userRoutes = require('./routers/user-route');
// const msgRouter = require('./routers/msg-router');
// const groupRouter = require('./routers/group-route');

// app.use(express.json());
// app.use(express.static('public'));

// const User = require('./models/user-model');
// const Msg = require('./models/msg-model');
// const Group = require('./models/group-model');
// const Member = require('./models/member-model');

// app.use('/user', userRoutes);

// // Pass io to msgRouter
// app.use('/user', msgRouter(io));

// app.use('/user', groupRouter);

// cron.schedule('0 0 * * *', async () => {
//     try {
//         await cronJob.runJob();
//     } catch (error) {
//         console.log('Error in cron job schedule', error);
//     }
// }, {
//     timezone: 'Asia/Kolkata',
// });

// User.hasMany(Msg);
// Msg.belongsTo(User);

// User.belongsToMany(Group, { through: Member });
// Group.belongsToMany(User, { through: Member });

// Group.hasMany(Msg, { constraints: true, onDelete: 'CASCADE' });
// Msg.belongsTo(Group);

// sequelize.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
//     httpServer.listen(4000, () => {
//         console.log('Server is running on port 4000');
//     });
// }).catch((err) => {
//     console.log('Error syncing Sequelize:', err);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const cors = require('cors');
// const initializeSocket = require('./util/socket');
// const cron = require('node-cron');
// const cronJob = require('./services/cronjob');
// const sequelize = require('./util/database');

// const app = express();
// const httpServer = http.createServer(app);
// const io = initializeSocket(httpServer);

// app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// const userRoutes = require('./routers/user-route');
// const msgRouter = require('./routers/msg-router');
// const groupRouter = require('./routers/group-route');

// app.use(express.json());
// app.use(express.static('public'));

// const User = require('./models/user-model');
// const Msg = require('./models/msg-model');
// const Group = require('./models/group-model');
// const Member = require('./models/member-model');

// app.use('/user', userRoutes);
// app.use('/user', msgRouter(io));
// app.use('/user', groupRouter);

// cron.schedule('0 0 * * *', async () => {
//     try {
//         await cronJob.runJob();
//     } catch (error) {
//         console.log('Error in cron job schedule', error);
//     }
// }, {
//     timezone: 'Asia/Kolkata',
// });

// User.hasMany(Msg);
// Msg.belongsTo(User);

// User.belongsToMany(Group, { through: Member });
// Group.belongsToMany(User, { through: Member });

// Group.hasMany(Msg, { constraints: true, onDelete: 'CASCADE' });
// Msg.belongsTo(Group);

// sequelize.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
//     httpServer.listen(4000, () => {
//         console.log('Server is running on port 4000');
//     });
// }).catch((err) => {
//     console.log('Error syncing Sequelize:', err);
// });




const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const initializeSocket = require('./util/socket');
const cron = require('node-cron');
const cronJob = require('./services/cronjob');
const sequelize = require('./util/database');

const app = express();
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

// Use CORS middleware
app.use(cors({
    origin: '*', // Add your frontend server URL
    
    credentials: true,
}));

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const userRoutes = require('./routers/user-route');
const msgRouter = require('./routers/msg-router');
const groupRouter = require('./routers/group-route');

app.use(express.json());
app.use(express.static('public'));

const User = require('./models/user-model');
const Message = require('./models/msg-model');
const Group = require('./models/group-model');
const Member = require('./models/member-model');

app.use('/user', userRoutes);
app.use('/user', msgRouter(io));
app.use('/user', groupRouter);

cron.schedule('0 0 * * *', async () => {
    try {
        await cronJob.runJob();
    } catch (error) {
        console.log('Error in cron job schedule', error);
    }
}, {
    timezone: 'Asia/Kolkata',
});

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: Member });
Group.belongsToMany(User, { through: Member });

Group.hasMany(Message, { constraints: true, onDelete: 'CASCADE' });
Message.belongsTo(Group);

sequelize.sync().then(() => {
    httpServer.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
}).catch((err) => {
    console.log('Error syncing Sequelize:', err);
});
