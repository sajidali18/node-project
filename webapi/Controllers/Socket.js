const userdata = {}
const skthandler = (skt) => {
    skt.on('connection', (socket) => {
        console.log('user connected', socket.id);

        socket.on('joinRoom', ({ room, user }) => {
            socket.join(room);
            userdata[socket.id] = { email: user.email, name: user.First_name, socket_id: socket.id }
            skt.to("live users").emit("updateUsers", Object.values(userdata));
            console.log(userdata);
            // console.log(`User ${socket.id} joined room : ${room}`);
        });
        socket.on('disconnect', () => {
            console.log(`user disconnected ${socket.id}`);
        })
    })
}
module.exports = skthandler;