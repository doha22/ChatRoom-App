import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../pictures/chat.png"
import chat from "../pictures/create_chat.png" ;

const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    
    const getChatrooms = () => {
      axios
        .get("http://localhost:8088/chatroom", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then((response) => {
          setChatrooms(response.data);
        })
        .catch((err) => {
          setTimeout(getChatrooms, 8000);
        });
    };
  
    React.useEffect(() => {
      getChatrooms();
      // eslint-disable-next-line
    }, []);
  
    return (
      <div className="card-dashboard">
      <div className="card">
       
        <div className="cardHeader" >
        <div> <img src={logo} className="logo"/></div>
        </div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="chatroomName">Chatroom Name</label>
            <input
              type="text"
              name="chatroomName"
              id="chatroomName"
              placeholder="chat00"
            />
          </div>
        </div>
        <button >Create Chatroom</button>
       
        <div className="chatrooms container">
          <div className="col-md-2"></div>
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom col-md-4">
              
              <div>
                <img className="chat" src={chat} /> 
                <br></br>
             <span className="chat-name">   {chatroom.name}  </span> 
              <Link to={"/chatroom/" + chatroom._id}>
                
                <div className="join col-md-4">Join</div>
              </Link>
              </div>
            </div>

          ))}
          <div className="col-md-2"></div>
        </div>

       
      </div>
      </div>
    );
  };
export default DashboardPage;