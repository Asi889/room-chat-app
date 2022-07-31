const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require('./src/utils/users')
const formatMessage = require('./src/utils/messages');
let botName = 'Asi Admin: ';
// const createAdapter = require("@socket.io/redis-adapter").createAdapter;
// const redis = require("redis");
// const { createClient } = redis;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);


        // welcome curent  user
        socket.emit('message', formatMessage(botName, 'Yo Yooo! Welcome to de chat room, Behave yourselves!!!'))

        //Brodacst when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });

    });





    // listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    // runs when client dissconects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }

    })

})



const port = 3000 || process.env.PORT



server.listen(port, () => console.log(" server running on port ", port))