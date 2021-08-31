const express = require('express')
const socketio = require('socket.io')
const data = require("./RunGame/Engine/GetData")
const gameLoop = require("./start")
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('index')
});

const server = app.listen(process.env.PORT || 3030, () => {
    console.log("server is running")
});

const io = socketio(server)
var running

io.on('connection', socket => {
  
  socket.on("start", irrelevant => {
    
    gameLoop.Start()
    console.log("gameloop starting")

    running = setInterval(() => {
    
      socket.emit('broadcast', {
        xcoord: data.info.xcoord, 
        ycoord: data.info.ycoord, 
        maxHealth: data.info.healthMax,
        currentHealth: data.info.healthCurrent,
      })

    }, 500);

  });

  socket.on("stop", irrelevant => {

    clearInterval(running)
    gameLoop.StopLoop()
    console.log("stopping")
    
  });

});
