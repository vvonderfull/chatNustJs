const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
let users = require('./users')()

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Некорректные данные!')
    }

    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
      mute: false
    })

    cb({userId: socket.id})
    io.to(data.room).emit('updateUsers', users.getAllUser(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} вошел в комнату.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Сообщение не может быть пустым!')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb()
  })

  socket.on('userLeave', (id, cb) => {
    const user = users.remove(id)

    if (user) {
      io.to(user.room).emit('updateUsers', users.getAllUser(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел из чата.`))
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)

    if (user) {
      io.to(user.room).emit('updateUsers', users.getAllUser(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел из чата.`))
    }
  })
})

module.exports = {
  app, server
}
