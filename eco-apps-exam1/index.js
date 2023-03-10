import express, { request, response } from "express";
import {
    Server
} from "socket.io";


const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
        'Controller': `http://localhost:${PORT}/controller`
    })

})
const io = new Server(httpServer, {
    path: '/real-time'
})

expressApp.use('/game', express.static('public-game'))
expressApp.use('/controller', express.static('public-controller'))
expressApp.use(express.json())

/*___________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.
_____________________________________________ */

io.on('connection', (socket) => {
 console.log (socket.id);
 socket.on ("instructions-controller", message => {
console.log(message);
socket.broadcast.emit("instructions-game", message)
 });
socket.on("directions-controller", directionsCotroller =>{
 console.log(directionsCotroller);
 socket.broadcast.emit("directions-controller", directionsCotroller)
 });

});

let currentScore = 0;

/*___________________________________________

2) Create an endpoint to POST player's current score and print it on console
_____________________________________________ */

expressApp.post('/score', (request, response) => {
   //
})

/*___________________________________________

3) Create an endpoint to GET player's final score and print it on canvas
_____________________________________________ */

expressApp.get('/final-score', (request, response) => {
    //
})