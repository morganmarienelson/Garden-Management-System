const io = require("socket.io")(5000, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    const username = socket.handshake.query.username
    socket.join(username)

    socket.on('send-message', ({recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(username)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients : newRecipients, sender: username, text
            })
        })
    })
})