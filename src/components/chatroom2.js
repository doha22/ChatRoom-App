// import React from "react";
// import io from "socket.io-client";

// class chatrooms extends React.Component{
//     constructor(props){
//         super(props);

//         this.onChangetext = this.onChangetext.bind(this);

//         this.onSubmit = this.onSubmit.bind(this);

        

//         this.state = {
//             message: '',
//             messages: [] ,
//             setMessages :[],
//             userId :" ",
//             setUserId : ""
//         };

//         this.socket = io('localhost:8088');
//     }
//     onChangetext(e) {
//         this.setState({ 
//             text: e.target.value 
//         })
//     }

//     componentDidMount(){
//         const token = localStorage.getItem("CC_Token");
//         console.log("token--"+token)
//         if (token) {
//           const payload = JSON.parse(atob(token.split(".")[1]));
//           console.log("payload id ---"+payload._id)
//           this.state.setUserId(payload._id);
//         }
    
//         if (socket) {
//           console.log("socket on ")
//           socket.on("newMessage", (message) => {
            
//             const newMessages = [...messages, message];
//             this.state.setMessages(newMessages);
          
         
            
//           });
//         }
//         else{console.log("socket is off")}
    
//         //eslint-disable-next-line
//     //   },[messages]);


//         }

//         // when reply with comment
//     onSubmit(e) {
//         e.preventDefault()

//         if (socket) {
//             console.log("socket on ")
//             socket.emit("chatroomMessage", {
//               chatroomId,
//              // message: e.current.value,
//              message : this.state.message
             
//             });
            
//       // to clear message after typing
//       this.setState({
//         messages: ''
//       });
//           }  else{console.log("socket is off")}

//         // const com = {
//         //        text : this.state.text,
//         //        username : sessionStorage.getItem('username') ,
//         //        createdAt:Date.now()
 
//         //      }
//         // axios.post("http://localhost:8888/category/"+this.Q_id ,(com) ) 
//         // .then(
//         //   res => {
//         //     console.log("reply done");
//         //     console.log(res.data);
//         //     // clear comment field after submitting
//         //     this.setState({
//         //       text: ''
//         //     });
//         // })

//     }

//         // const addMessage = data => {
//         //     console.log(data);
//         //     this.setState({messages: [...this.state.messages, data]});
//         //     console.log(this.state.messages);
//         // };

//         // this.socket.on('RECEIVE_MESSAGE', function(data){
//         //     addMessage(data);
//         // });

    

//         // this.sendMessage = ev => {
//         //     ev.preventDefault();
//         //     this.socket.emit('SEND_MESSAGE', {
//         //         author: this.state.username,
//         //         message: this.state.message
//         //     })
//         //     this.setState({message: ''});

//         // }
    
//     render(){
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="card-title">Global Chat</div>
//                                 <hr/>
//                                 <div className="messages">
//                                     {this.state.messages.map(message => {
//                                         return (
//                                             <div>{message.author}: {message.message}</div>
//                                         )
//                                     })}
//                                 </div>

//                             </div>
//                             <div className="card-footer">
//                                 <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
//                                 <br/>
//                                 <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
//                                 <br/>
//                                 <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default chatrooms;