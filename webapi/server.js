const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
const UserRoutes = require('./Routes/UserRoutes');
const Database = require('./config/db');
const { Socket } = require('dgram');

dotenv.config();
Database();

const app = express();
const server = http.createServer(app);
const skt = new Server(server, {
    cors: {
        origin: 'https://phenomenal-moxie-0f5f18.netlify.app',
        credentials: true,
    },
});

app.use(cors({
    origin: 'https://phenomenal-moxie-0f5f18.netlify.app',
    credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
    req.skt = skt;
    next();
});
app.get('/', (req, res) => {
    res.send("hello this side from is server side");
})
app.use('/data', UserRoutes);

skt.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('joinRoom', (room) => {
        socket.join(room);
        // console.log("sajid ali")
        console.log(`User ${socket.id} joined room : ${room}`);
    });
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
});
const port = process.env.PORT;
app.use(express.json());

server.listen(port, () => {
    console.log(`server listening on ${port}`);
});


