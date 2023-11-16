const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const cors = require('cors');

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) =>  {
    console.log(`Connected to socket: ${socket.id}`);

    socket.on('message',(data) => {
        console.log("Message received");
        console.log(data);
        socket.broadcast.emit('receivemessage', data);

    })
})



server.listen(process.env.PORT || 3001, () => {
    console.log("Server is running on port 3001");
});
