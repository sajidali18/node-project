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

// ✅ Allowed origins
const allowedOrigins = ["http://localhost:5173", "https://phenomenal-moxie-0f5f18.netlify.app"];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ Apply CORS properly
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// ✅ Middleware
app.use(express.json());

// ✅ Initialize Socket.io with CORS
const skt = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// ✅ Attach socket to request object
app.use((req, res, next) => {
    req.skt = skt;
    next();
});

// ✅ Test route
app.get('/', (req, res) => {
    res.send("Hello, this is the server side");
});

// ✅ Routes
app.use('/data', UserRoutes);

// ✅ Handle Socket.io events
skthandler(skt);

// ✅ Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
