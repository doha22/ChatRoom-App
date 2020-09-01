
import React, { Component } from 'react';
import axios from 'axios';
import makeToast from "../toaster";

import '../App.css';
//import { Redirect } from 'react-router-dom';
import registeration from "../pictures/register.png"

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this)

       
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this.onSubmitLogin = this.onSubmitLogin.bind(this);

        this.state = {
            email : '',
            password: ''
        }
    }

// to redirect to anther page 
    // history = useHistory();

     routeChange = () =>{ 
    
    this.props.history.push("/dashboard");
  }

    onChangeEmail(e) {
        this.setState({ 
            email: e.target.value 
        })
    }

    onChangePassword(e) {
        this.setState({ 
            password: e.target.value 
        })
    }


    onSubmit(e) {
        e.preventDefault()
        const result = {
               email: this.state.email,
               password : this.state.password
 
             }

        axios.post("http://localhost:8088/user/login", (result)) 
        .then(
            (response) => {
            makeToast("success", response.data.message);
            console.log(response.data.message)
            // use local storage 
           localStorage.setItem("CC_Token", response.data.token);

            // sessionStorage.setItem('username',res.data.users.fullName);
            // console.log(sessionStorage.getItem('username')) ;
            this.routeChange();
            this.setupSocket();
          
        })
        .catch((err) => {
            // console.log(err);
            if (
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message
            )
              makeToast("error", err.response.data.message);
          })
    }



    render() {
        return (
          <div className="card-dashboard">
            <div className="card">
              <div className="row">
              <div className="col-md-1"></div>
             <div className="col-md-7">
              <div className="cardBody">
                  <form onSubmit={this.onSubmit} action="/" method="post">
                <div className="inputGroup">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                  />
                </div>
                <button  onClick={this.onSubmit}>Login</button>

                </form>
              </div>
              </div>
            <div className="col-md-4">
            <img className="registeration" src={registeration} /> 
            </div>
            </div>
            </div>
            </div>
          );
        };
}

// export default FormPage;
