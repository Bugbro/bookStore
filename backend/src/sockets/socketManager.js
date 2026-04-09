let onlineUser = new Map();

export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        
        // Emit total connected clients immediately when someone connects
        io.emit("activeUsers", io.engine.clientsCount);

        socket.on("userOnline", (userId) => {
            onlineUser.set(userId, socket.id);
        });

        socket.on("disconnect", () => {
            for (let [userId, socketId] of onlineUser.entries()) {
                if (socketId === socket.id) {
                    onlineUser.delete(userId);
                    break;
                }
            }
            // Emit updated total connected clients when someone disconnects
            io.emit("activeUsers", io.engine.clientsCount);
        });
    });
};