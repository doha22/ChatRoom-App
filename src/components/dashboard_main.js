import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from "../pictures/chat.png"
import chat from "../pictures/group.png" ;

export default class dashbord extends Component {

    constructor(props) {
        super(props);
        


        this.onChangetext = this.onChangetext.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name : '',
            chatrooms : []

           
        }
    }

    onChangetext(e) {
        this.setState({ 
            name: e.target.value 
        })
    }

    



componentDidMount(){
// get chatrooms 

  axios.get("http://localhost:8088/chatroom", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then(response => {
          this.setState({ chatrooms: response.data });
  
          console.log("response data "+response.data)
        }) 
        // .catch((error) => {
        //   setTimeout(getChatrooms, 8000);
        // });
    


   


}
    ////////////////////////////////////////////////////////

// when reply with comment
    onSubmit(e) {
        // e.preventDefault()
        const data = {
               name : this.state.name,
 
             }

           axios.post("http://localhost:8088/chatroom",(data), {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then(response => {
          this.setState({
            name: ''
          });
  
          console.log("response name: "+response.data.name)
        })
      }

  

    ////////////////////////////////////////////////////

// to list the others chatrooms

render_chatrooms() {

  return this.state.chatrooms.map(room => {
    return (
      <tr key={room._id}>
        
        <td>{room.username}</td>
       
       
      </tr>
    );
         

  })

// else alert message you should select title first
}
   
 

    render() {
    
     

      return (
        <div className="card-dashboard">
        <div className="card">
           <form onSubmit={this.onSubmit} action="/" method="post">
           <div className="cardHeader" >
        <div> <img src={logo} className="logo"/></div>
        </div>
        <div className="container">
          <div className="col-md-3"></div>
          <div className="cardBody col-md-6">
            <div className="inputGroup">
              <label htmlFor="chatroomName" className="chat-name">Chatroom Name</label>
              <input
                type="text"
                name="chatroomName"
                id="chatroomName"
                placeholder="Enter ChatRoom Name"
                onChange={this.onChangetext}
                value={this.state.name}
                required
              />
            </div>
          </div>
          </div>

          <button>Create Chatroom</button>
          
          <div className="container">


        <div className="chatrooms ">
          <div className="col-md-2"></div>
          <div  className="chatroom  container">
          {this.state.chatrooms.map((chatroom) => (
            <div  className="col-md-4" key={chatroom._id} >
              
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
<br></br>
  
           </div>
          <div className="col-md-2"></div>
        </div>



          </div>
          </form>
        </div>
        </div>
      );
}
}