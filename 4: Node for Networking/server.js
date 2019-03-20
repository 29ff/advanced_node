const server = require('net').createServer();

let counter = 0;
let sockets = {}

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Type your name: ')

  // mỗi khi có một client kết nối sẽ thêm id cho socket thêm socket của client này vào object sockets
  socket.id = counter++
  

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim()
      sockets[socket.id] = socket
      socket.write(`Hello ${socket.name}!\n`)
      return
    }

    // mỗi khi nhận được data, chúng ta sẽ thực hiện gửi lại data này cho tất cả các client có trong object sockets
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      // không nên gửi lại cho chính người đó
      if (socket.id == key) return
      clientSocket.write(`${socket.name}: `)
      clientSocket.write(data)
    })
  });

  socket.on('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
