const haiku = require('./haiku');
const rooms = {};

async function randomID() {
    let id = haiku();
    while (id in users) {
      await Promise.delay(5);
      id = haiku();
    }
    return id;
  }
  
exports.create = async (socket) => {
    const id = await randomID();
    rooms[id] = {
        clientId: id,
        socket
    }
    return id;
};

exports.get = id => rooms[id];
exports.getAll = () => rooms;
exports.remove = id => delete rooms[id];
