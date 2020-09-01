import React from 'react';
// import logo from './logo.svg';
import Login from "./components/login";
import Register from "./components/registeration"
 import DashboardPage from "./components/dashboard";
 import Index from "./components/index";
 import Chatroom  from "./components/chatroom"
 import io from "socket.io-client";
 import makeToast from "./toaster";

 import dashbord from "./components/dashboard_main"

 //import chatrooms  from "./components/chatroom2"


import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {

 
// const socket = io.connect('http://localhost:3000', {
//   query: {token}
// });

  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    
    if (token && !socket) {
      const newSocket = io("http://localhost:8088", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        console.log("disconnected")
        setSocket(null);
        setTimeout(setupSocket, 8000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        console.log("connected")

      
        
        
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
    console.log("socket --"+socket)
  };

  
  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <Router>
    <Route path="/" component={Index} exact />
      <Route path="/login" component={Login} setupSocket={setupSocket} exact />
   

      <Route path="/register" component={Register} exact />

      <Route path="/dashboard" component={DashboardPage} socket={socket} exact />

      <Route path="/dashboard2" component={dashbord} socket={socket} exact />

      {/* <Route path="/chatroom/:id" component={Chatroom} socket={socket} exact /> */}

      {/* <Route path="/chatrooms/:id" component={chatrooms} socket={socket} exact /> */}

{/* <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        */}

        <Route
          path="/chatroom/:id"
           render={() => <Chatroom socket={socket} />}
         exact
         />  


    </Router>
  );
}

export default App;
