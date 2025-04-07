// 🔧 Socket Controller File (Controllers/Socket.js)

const User = require('../models/UserSchema');

let liveUsers = []; // Store live users in memory

const skthandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinLiveUsersRoom", async ({ Email }) => {
            console.log("joinLiveUsersRoom received for:", Email);    
            await User.findOneAndUpdate({ Email: Email }, { socketId: socket.id });

            const user = await User.findOne({ Email: Email });
            if (!user) return;

            socket.join("live users");

            // Add to local memory if not already present
            if (!liveUsers.find(u => u.Email === user.Email)) {
                liveUsers.push({
                    First_Name: user.First_Name,
                    Last_Name: user.Last_Name,
                    Email: user.Email,
                    socketId: socket.id
                });
            }

            io.to("live users").emit("updateUsers", liveUsers);
        });

        socket.on("getUserDetails", async (socketId, callback) => {
            const user = await User.findOne({ socketId });
            callback(user);
        });

        socket.on("disconnect", async () => {
            console.log("User disconnected:", socket.id);
            liveUsers = liveUsers.filter(u => u.socketId !== socket.id);
            await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
            io.to("live users").emit("updateUsers", liveUsers);
        });
    });
};

module.exports = skthandler;
