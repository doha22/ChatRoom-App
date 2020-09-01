const http = require('http');
const express = require('express');
const socket = require('socket.io');

const cors = require('cors');
const app = express();
const router = require('./router');
const server = http.createServer(app);
var mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser')

require("./models/user");
require("./models/chat");
require("./models/messages");

const jwt = require('jsonwebtoken')

app.use(cors());
// mongodb connection 

try{

const uri = "mongodb+srv://admin:1234@cluster0-14764.mongodb.net/chat?retryWrites=true&w=majority";
//const uri = "mongodb+srv://admin:1234@cluster0.d1cpf.mongodb.net/chat?retryWrites=true&w=majority";   
    mongoose.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
      );
      const connection = mongoose.connection;
      connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
      });
    
    }catch (err) {
        console.error(err.message);
    }
  
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.use(router);
app.use("/user", require("./routes/user"));

app.use("/chatroom", require("./routes/chatroom"));

// creating middle for if site is down or not accepting request 
app.use((req , res , next)=>{
  res.status(503).send("site is currently down , try later");
 })

 server.listen(8088);







const Message = mongoose.model("Message");
const User = mongoose.model("User");
const chat = mongoose.model("Chatroom")



const io = socket(server);


io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, 'AuthUser', function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      // socket.decoded = decoded;
      socket.userId = decoded._id;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }    
})
io.on('connection', function(socket) {
  console.log("Connected: " + socket.userId);
    // Connection now authenticated to receive further events

    socket.on('message', function(message) {
        io.emit('message', message);

        console.log("message"+message)
        
    });
    
// });
console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });




  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
 
});

  // for messages

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    console.log("mesg len ="+message.trim().length)
    if (message.trim().length > 0) {

      const user = await User.findOne({ _id: socket.userId });
    

    console.log("user id ----"+socket.userId)
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });



      console.log("new messages--"+ newMessage.message)

      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name ,
        userId: socket.userId,
      });

     
      await newMessage.save();

      console.log("messages------"+ newMessage)
    }
  });
});








