const express = require('express')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
const server = app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

var config = {
    apiKey: "AIzaSyDXNaFSL3tAO4jDRc-thQAgoV8UXt3ECRE",
    authDomain: "justactivities-72891.firebaseapp.com",
    databaseURL: "https://justactivities-72891.firebaseio.com",
    projectId: "justactivities-72891",
    storageBucket: "",
    messagingSenderId: "951386938099"
}
var firebase = require('firebase');  
firebase.initializeApp(config);
var db = firebase.database();
var scoreRef = db.ref('scores');
// if(!dev) {

// }



const io = require('socket.io')(server);
var users = [];
var start;
var end;
io.on('connection', function (socket) {
  console.log(`${socket.id} connected`);

  socket.on('JOIN_LOBBY', function (msg) {
    users.push({
      socketId: socket.id,
      data: msg
    });
    io.emit('SERVER:SIGNAL_USERS', users);
  });

  //Signal ready for game - users get ready
  socket.on('CLIENT:START_GAME', function (msg) {
    io.emit('SERVER:SIGNAL_START');
  })

  //Start signal - game starts
  socket.on('CLIENT:SEND_START_SIGNAL', function(msg) {
    io.emit('SERVER:SIGNAL_ACTIVITY_START');
  });

  socket.on('CLIENT:SET_STARTTIME', function(msg) {
    start = new Date();
  });

  socket.on('CLIENT:SEND_STOP_SIGNAL', function(msg) {
    end = new Date();

    var timeInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    msg.score = timeInSeconds;
    msg.date = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
    scoreRef.push(msg);

  })

  socket.on('disconnect', function (msg) {
    console.log(`${socket.id} disconnected`);
    users = users.filter((item, index) => {
      if (item.socketId != socket.id) {
        return true;
      }
      return false;
    });
  });

});