import express from 'express';
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

// טוען את משתני הסביבה מקובץ .env
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to 2048 Battle Game!');
});

io.on('connection', (socket) => {
    console.log('Player connected: ', socket.id);

    socket.on('message', (data) => {
        console.log('Message from player: ', data);
        socket.broadcast.emit('message', data); // שידור לשחקן השני
    });



    socket.on('move', (data) => {
        console.log('Player move: ', data);
        socket.broadcast.emit('move', data);
    });

    

    socket.on('disconnect', () => {
        console.log('Player disconnected: ', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
