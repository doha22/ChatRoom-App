// to check for user authentication

import React from "react";
import "../styles/style.css"
 import'bootstrap/dist/css/bootstrap.min.css';
// import $ from'jquery';
// import'bootstrap/dist/js/bootstrap.bundle.min';




const Index = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log(token);
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default Index;