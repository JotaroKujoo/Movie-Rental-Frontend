
import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import './Profile.scss';

import { bringUserInfo } from '../../../services/apicalls';
// import UserOrders from '../UserOrders/UserOrders';

import { userData } from "../userSlice";

import { useSelector } from "react-redux";

const Profile = () => {

    //I will create a hook on which I will deposit the movies once they arrive to us...

    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState('');
    const user = useSelector(userData);
    const userMail = JSON.parse(localStorage.getItem("SAVEUSERMAIL"))

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (userInfo.length === 0) {
            // bringmovies()
            bringUserInfo(userMail)
                .then(
                    (res) => {
                        setUserInfo(res.data)
                        console.log(res)
                    }
                )
                .catch((error) => {
                    console.error(error)
                    setError(error.response?.data || 'ups intentalo de nuevo')
                })
        };


    }, [userInfo]);

    console.log(userInfo)

    if (error) {
        return <h2>{error.repeat(999)} </h2>
    }

    return (
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    )
   
};

export default Profile;