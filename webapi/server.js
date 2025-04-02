const express = require('express');
const dotenv = require('dotenv');
const UserRoutes = require('./Routes/UserRoutes');
const cors = require('cors');
dotenv.config();
const Database = require('./config/db');

const app = express();
app.use(cors({
    origin: 'https://super-donut-b3e0d3.netlify.app',
    credentials: true
}));
Database();

const port = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello this side from is server side");
})
app.use('/data', UserRoutes);
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});


