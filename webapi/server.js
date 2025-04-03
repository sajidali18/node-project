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
const allowedOrigins = [
    "http://localhost:5173",  // Vite frontend (localhost)
    "http://localhost:3000",  // CRA frontend (localhost)
    "https://phenomenal-moxie-0f5f18.netlify.app"  // Deployed frontend
];

// Explicitly set CORS headers in middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
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


