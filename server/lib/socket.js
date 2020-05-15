const io = require('socket.io');
// const users = require('C:/Users/Acer/HONG/client/src/AccountLogin')
const users = require('./users')

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
  let id;
  socket
    .on('init', async () => {
      id = await users.create(socket);
      console.log('init:', id)
      socket.emit('init', { id });
    })
    .on('request', (data) => {
      const receiver = users.get(data.to).socket;
      if (receiver) {
        console.log('request:', id)
        receiver.emit('request', { from: id });
      }
    })
    .on('call', (data) => {
      const receiver = users.get(data.to).socket;
      if (receiver) {
        console.log('call:', id)
        receiver.emit('call', { ...data, from: id });
      } else {
        socket.emit('failed');
      }
    })
    .on('end', (data) => {
      const receiver = users.get(data.to).socket;
      if (receiver) {
        receiver.emit('end');
      }
    })
    .on('disconnect', () => {
      users.remove(id);
      console.log(id, 'disconnected');
    });
}

module.exports = (server) => {
  io
    .listen(server, { log: true })
    .on('connection', initSocket);
};

// function initSocket(socket) {
//   let id;
//   socket
//     .on('init', async () => {
//       id = await users.create(socket);
//       console.log('init:', id)
//       socket.emit('init', { id });
//     })
//     .on('request', (data) => {
//       const receiver = users.get(data.to).socket;
//       if (receiver) {
//         console.log('request:', id)
//         receiver.emit('request', { from: id });
//       }
//     })
//     .on('call', (data) => {
//       const receiver = users.get(data.to).socket;
//       if (receiver) {
//         console.log('call:', id)
//         receiver.emit('call', { ...data, from: id });
//       } else {
//         socket.emit('failed');
//       }
//     })
//     .on('end', (data) => {
//       const receiver = users.get(data.to).socket;
//       if (receiver) {
//         receiver.emit('end');
//       }
//     })
//     .on('disconnect', () => {
//       users.remove(id);
//       console.log(id, 'disconnected');
//     });
// }

// module.exports = (server) => {
//   io
//     .listen(server, { log: true })
//     .on('connection', initSocket);
// };