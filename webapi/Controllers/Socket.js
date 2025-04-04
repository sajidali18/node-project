const userdata = {};

const skthandler = (skt) => {
    skt.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Handle user joining a room
        socket.on('joinRoom', ({ room, user }) => {
            socket.join(room);
            userdata[socket.id] = { Email: user.Email, Name: user.First_Name, socket_id: socket.id };
            skt.to(room).emit('updateUsers', Object.values(userdata));
            console.log('Current users:', userdata);
        });

        // Handle request for users in a room
        socket.on('getUsersInRoom', (room) => {
            const usersInRoom = Object.values(userdata).filter(user => user.room === room);
            skt.to(room).emit('updateUsers', usersInRoom);
        });

        // Handle user disconnectn
        socket.on('disconnect', () => {
            const user = userdata[socket.id];
            if (user) {
                delete userdata[socket.id];
                skt.to(user.room).emit('updateUsers', Object.values(userdata));
            }
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = skthandler;
