const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
const UserRoutes = require('./Routes/UserRoutes');
const Database = require('./config/db');
const { Socket } = require('dgram');
const skthandler = require('./Controllers/Socket');

dotenv.config();
Database();

const app = express();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:5173", "https://phenomenal-moxie-0f5f18.netlify.app"];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));
// app.options('/*', cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    next();
});
const skt = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

app.use((req, res, next) => {
    req.skt = skt;
    next();
});

app.get('/', (req, res) => {
    res.send("hello this side from is server side");
})
app.use('/data', UserRoutes);

// skt.on('connection', (socket) => {
//     console.log('user connected', socket.id);
//     socket.on('joinRoom', ({ room, user }) => {
//         socket.join(room);
//         // console.log("sajid ali")
//         console.log(`User ${socket.id} joined room : ${room}`);
//     });
//     socket.on('disconnect', () => {
//         console.log(`user disconnected ${socket.id}`);
//     });
// });

skthandler(skt);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`server listening on ${port}`);
});


