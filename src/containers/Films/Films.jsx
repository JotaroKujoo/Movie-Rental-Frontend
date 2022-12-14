import React from "react";
import "../Films/Films.scss";
import { useNavigate } from "react-router-dom";
import { bringFilms, bringAccion, bringComedia, bringInfantil, searchFilms } from '../../services/apicalls'
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { addFilm, } from "./FilmSlice"
import  { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';



const Films = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [criteria, setCriteria] = useState('')

    const inputHandler = (e) => {
       
        setCriteria(e.target.value);
    }




    const clickedMovie = (movie) => {

        //Guardo la película seleccionada en redux.

        dispatch(addFilm({ ...movie, details: movie }));

        setTimeout(() => {
            navigate("/filmsView");
        }, 750);
    }

    const filmsComedia = () => {
        bringComedia()
            .then(res => {
                setMovies(res.data)
            })
    }

    const filmsAccion = () => {
        bringAccion()
            .then(res => {
                setMovies(res.data)
            })
    }

    const filmsInfantil = () => {
        bringInfantil()
            .then(res => {
                setMovies(res.data)
            })
    }

    const allFilms = () => {
        bringFilms().then(
            (res) => {
                setMovies(res.data)
                
            }
        );
    }

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (movies.length === 0) {


            //Adding a 1 seconds delay on purpose...



            setTimeout(() => {

                bringFilms().then(
                    (res) => {
                        setMovies(res.data)
                        
                    }
                );

            }, 1000);



        };

    }, [movies]);

    useEffect(() => {

        

        if (criteria !== '') {

            //Voy a aplicar mi proceso de debounce....

            const bring = setTimeout(() => {

                searchFilms(criteria)
                    .then(res => {
                       
                        setMovies(res.data)
                        
                    })
                    .catch(error => console.log(error));

            }, 150);

            return () => clearTimeout(bring);

        } else if (criteria === '') {
            bringFilms().then(
                (res) => {
                    setMovies(res.data)
                    
                }
            );
        }

    }, [criteria])




    if (movies.length === 0) {
        return (
            <Container fluid className="filmsDesign" >
                 <Row className="d-flex justify-content-center" >
                    <Form className="d-flex searchDesign ">
                        <Form.Control
                            type="criteria"
                            placeholder="search for a film!"
                            name="criteria"
                            aria-label="Go!"
                            onChange={(e) => inputHandler(e)}
                        />
                    </Form>

                </Row>
  <br></br>
                <Row   >

                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={allFilms}>Todas</Button></Col>
                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsComedia}>Comedia</Button></Col>
                 <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsAccion}>Acción</Button></Col> 
                 <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsInfantil}>Infantil</Button></Col> 

                </Row>
              
                <Row className="d-flex align-content-end justify-content-center w-100 spinnerDesign">
                    <Spinner className=" spinnerDesign"/>

                </Row>

            </Container>
        )
    } else {
        return (
            <Container fluid className="filmsDesign" >
                <Row className="d-flex justify-content-center" >
                    <Form className="d-flex searchDesign">
                        <Form.Control
                            type="criteria"
                            placeholder="search for a film!"
                            name="criteria"
                            aria-label="Go!"
                            onChange={(e) => inputHandler(e)}
                        />
                    </Form>

                </Row>
<br></br>
                <Row   >

                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={allFilms}>Todas</Button></Col>
                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsComedia}>Comedia</Button></Col>
                 <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsAccion}>Acción</Button></Col> 
                 <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filmsInfantil}>Infantil</Button></Col> 

                </Row>

                <Row flex >

                    {/* Here I proceed to MAP the hook which contains all the movies */}

                    {
                        movies.map(movie => (<Col>



                            <Image className="moviePic " src={movie.poster} onClick={() => clickedMovie(movie)} key={movie.id} />

                        </Col>
                        ))
                    }



                </Row>
            </Container>
        )
    }



}

export default Films