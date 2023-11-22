

// const socketIo = require("socket.io");

// function initializeSocket(httpServer) {
//     const io = new socketIo.Server(httpServer);

//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         socket.on('disconnect', () => {
//             console.log('A user disconnected');
//         });
//     });

//     return io;
// }

// module.exports = initializeSocket;


const socketIo = require("socket.io");

function initializeSocket(httpServer) {
    const io = new socketIo.Server(httpServer);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;




