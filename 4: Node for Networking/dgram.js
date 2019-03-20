const dgram = require('dgram')
const PORT = 3333
const HOST = '127.0.0.1'

// SERVER

const server = dgram.createSocket('udp4')

server.on('listening', () => console.log('UDP server listening'))

server.on('message', (message, rInfo) => {
  console.log(`${rInfo.address}:${rInfo.port} - ${message}`)
})

server.bind(PORT, HOST)

// CLIENT

const client = dgram.createSocket('udp4')

client.send('something here', PORT, HOST, err => {
  if (err) throw err
  client.close()
})

