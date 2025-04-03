const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const UserRoutes = require('./Routes/UserRoutes');
const Database = require('./config/db');
const skthandler = require('./Controllers/Socket');

dotenv.config();
Database();

const app = express();
const server = http.createServer(app);

// ✅ Define allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "https://phenomenal-moxie-0f5f18.netlify.app"
];

// ✅ CORS configuration
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

// ✅ Apply CORS middleware for HTTP requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Apply middleware to set headers for all responses
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

// ✅ Initialize Socket.io with CORS settings
const skt = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

// ✅ Middleware to attach `skt` to `req`
app.use((req, res, next) => {
    req.skt = skt;
    next();
});

// ✅ Define Routes
app.get('/', (req, res) => {
    res.send("Hello from the server!");
});
app.use('/data', UserRoutes);

// ✅ Socket.io event handling
skthandler(skt);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
