import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Space } from 'antd';
import { useState } from "react";
import { useEffect } from "react";

import "./Home.scss"
import { Image } from "react-bootstrap";

const Home = () => {
    
    let navigate = useNavigate();
      
    
    return (

        
        <div className="homeDesign container-fluid   d-flex flex-column align-items-center justify-content-around" >
          
            
 <div className="tituloDesign row-12 d-flex align-items-center justify-content-center">VideoRent</div>
            <div className="textCentralDesign row-12 d-flex align-items-center justify-content-center">Alquila todas las películas que quieras.</div>
            
            <div className="buttonHome row-6  d-flex justify-content-center">
                {/*<button className="buttonHomeDesign" onClick={() => navigate("/login")} href="../Login/Login.jsx</div>">Login</button>*/}
                 <Button className="buttonDesign col-6  d-flex justify-content-center " onClick={() => navigate("/login")} href="../Login/">Login</Button>

                <Button className="buttonDesign col-6  d-flex justify-content-center  " onClick={() => navigate("/register")} href="../Register" >Suscríbete</Button>
                {/*<button className="buttonHomeDesign" onClick={() => navigate("/login")} href="../Login/Login.jsx</div>">Subscríbete ya</button>*/}
            </div>



                </div>

    )

  
}

export default Home;