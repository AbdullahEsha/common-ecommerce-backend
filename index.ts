import dotenv from 'dotenv'
import app from './app'
import { io, httpServer } from './config'

//env config
dotenv.config()

//port config
const port = Number(process.env.PORT) || 5000
const socketPort = Number(process.env.SOCKET_PORT) || 5050

// socket io config connection
io.on('connection', (socket) => {
  socket.emit('noArg')
  socket.emit('basicEmit', 1, '2', Buffer.from([3]))
  socket.emit('withAck', '4', (e) => {
    // e is inferred as number
  })

  console.log('Test socket 🔥:', socket.rooms) // Set { <socket.id> }

  // works when broadcast to all
  io.emit('noArg')

  // works when broadcasting to a room
  io.to('room1').emit('basicEmit', 1, '2', Buffer.from([3]))
})

//server config
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// server config socket io
httpServer.listen(socketPort, () => {
  console.log(`Socket.io server is running on port ${socketPort}`)
})
