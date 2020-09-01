// here useing reat hook

import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../pictures/chat.png"
import send from "../pictures/send.jpg"
import exit from "../pictures/exit.jpg"
import { Link } from 'react-router-dom';


const Chatroom = ({ match , socket}) => {

  const chatroomId = match.params.id;

  //for intial state
  const [messages, setMessages] = React.useState([]);

  const messageRef = React.useRef();

  const [userId, setUserId] = React.useState("");



  const sendMessage = () => {
    if (socket) {
      console.log("socket on ")
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
       
      });
      
// to clear message after typing
      messageRef.current.value = "";
    }  else{console.log("socket is off")}
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log("token--"+token)
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("payload id ---"+payload._id)
      setUserId(payload._id);
    }

    if (socket) {
      console.log("socket on ")
      socket.on("newMessage", (message ) => {
        
        const newMessages = [...messages, message];
        console.log(messages)
        setMessages(newMessages);
      
        console.log("set messages"+setMessages)
        
      });

     
    }
    else{console.log("socket is off")}

    //eslint-disable-next-line
  },[messages]);



  React.useEffect(() => {
    if (socket) {
      console.log("joinRoom")
      socket.emit("joinRoom", {
        chatroomId,
      });
    }




   

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }


    };
    
   

    //eslint-disable-next-line
  }, []);

  // messages.forEach(value => {
  //   console.log(value)
  // })
  

  return (

    
    <div className="card-dashboard">
    <div >
      <div className="card">
      <div className="chatroomSection">
        <div className="cardHeader">
        <div> <img src={logo} className="logo"/></div>
        </div>
        <div className="chatroomContent">
      

        
          {
         
          messages.map((message,i) => (

      
          
    
            <div key={i} className="message">
             
                            <span
              
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
                
              >
                 
              

              {message.name}: 
              </span>{" "}
              
              {message.message}
            </div>
          ))}
        </div>
       
        {/* <form > */}
        <div className="container">
        <div className="chatroomActions">
          
          <div>
            <textarea
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            ></textarea>
          </div>
          <button className="btn_sent"  onClick={sendMessage}>
          <img src={send} className="sent"/>  
          </button>

        <div>
        <span>
        <Link to={"/dashboard2/"}>
                
        <img src={exit} className="exit"/> 
        <br></br>
        <span className="exit-name">leaveRoom</span> 
              </Link>
              </span>
          
           </div>  
        </div>


        </div>
       
        {/* </form> */}
      </div>
      </div>
    </div>
    </div>
  );

 
};

export default withRouter(Chatroom);