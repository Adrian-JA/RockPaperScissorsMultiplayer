const rooms = [];

function generateRoom() {
    const chars = "0123456789";
    const idRoomLength = 4;
    let room = "";
    for (let i = 0; i < idRoomLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        room += randomNumber;
    }

    return { id: room, players: [] };
}

function createRoom(idPlayer) {
    const room = generateRoom();
    room.players.push(idPlayer);

    rooms.push(room);
    return room;
}

function getRoomPosition(idRoom) {
    const indexRoom = rooms.findIndex((room) => room.id === idRoom);
    return indexRoom;
}

function removeRoom(idRoom) {
    const indexRoom = getRoomPosition(idRoom);

    rooms.splice(indexRoom, 1);
}

function joinQueue(userId) {
    if (rooms.length === 0) {
        const room = createRoom(userId);

        return room;
    }

    if (rooms.length > 0) {
        const room = rooms[0];
        room.players.push(userId);

        removeRoom(room.id);

        return room;
    }
}

module.exports = { joinQueue, removeRoom, rooms };
