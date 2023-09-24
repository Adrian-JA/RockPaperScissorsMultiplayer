const { removeRoom, joinQueue } = require("./utils/rooms");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("client:joinQueue", () => {
            const room = joinQueue(socket.id);

            socket.join(room.id);

            if (room.players.length === 2) {
                io.in(room.id).emit("server:start-game");
            }
        });

        socket.on("client:leaveGame", () => {
            const [userId, roomId] = socket.rooms;

            socket.to(roomId).emit("server:userLeaveGame");
        });

        socket.on("client:leaveQueue", () => {
            const [userId, roomId] = socket.rooms;
            socket.leave(roomId);
            removeRoom(roomId);
        });

        socket.on("client:leaveRoom", () => {
            const [userId, roomId] = socket.rooms;
            socket.leave(roomId);
        });

        socket.on("client:pickOption", (name) => {
            const [userId, roomId] = socket.rooms;
            socket.to(roomId).emit("server:pickOption", name);
        });

        socket.on("client:playAgain", () => {
            const [userId, roomId] = socket.rooms;
            io.in(roomId).emit("server:playAgain", userId);
        });

        socket.on("disconnecting", () => {
            const [userId, roomId] = socket.rooms;

            if (roomId) {
                removeRoom(roomId);
                socket.to(roomId).emit("server:userLeaveGame");
                return;
            }
        });
    });
};
