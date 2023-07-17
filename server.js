const PORT = 3000;

const io = require('socket.io')(PORT,{
    cors:{
        origin: ['*']
    }
})

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('send-msg', (msg, room) =>{
        room === '' ? 
            socket.broadcast.emit('share-msg', msg) : 
            socket.to(room).emit('share-msg', msg)
        console.log(msg);
    });

    socket.on('join-room', (room, callback) =>{
        socket.join(room);
        callback(`<strong style="color:blue">Just join to room:</strong> ${room}`);
    });
})

console.log("Server ON");