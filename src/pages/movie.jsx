import React, { useState, useEffect } from "react";
import { Rating, ThinStar } from '@smastrom/react-rating'
import styled from "styled-components"
import { useLocation } from "react-router-dom";
import Select from 'react-select'

import api from "../Api"
import { Button } from "../components/styling";

// SELECT USER, THEN ALLOW THAT USER TO RATE AND ADD MOVIE TO DB

export default function Movie() {
    const { state: movie } = useLocation(); // Gets the state sent from the previous page (Movie info)
    const img = 'https://image.tmdb.org/t/p/original' // Image URL
    const [genre, setGenre] = useState([]);
    const [person, setPerson] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [select, setSelect] = useState();
    const [showOutput, setShowOutput] = useState(false); // Check if output is showing or not
    const [output, setOutput] = useState('');

    const Add = async () => {
        setShowOutput(true)
        // Creates a object for an easier to read URL
        const m = {
            title: movie.title,
            link: `https://www.themoviedb.org/movie/${movie.id}`,
            genres: movie.genre_ids.map((x) => x).toString(),
            personId: select
        }
        // Posts the added movie to the Database
        await api.post(`Movies/Add?title=${m.title}&link=${m.link}&genres=${m.genres}&personId=${m.personId}`)
            .then(() => {
                console.log("Movie was added succesfully!");
                setOutput("Movie was added succesfully!");
            })
            .catch((err) => {
                console.log(err);
                console.log("Movie already exists in Database");
                setOutput("Movie already exists in Database");
            });
    }

    const Rate = async () => {
        setShowOutput(true)
        // Posts the added movie to the Database
        await api.post(`ratings/addrating?title=${movie.title}&movieRating=${userRating}&personId=${select}`)
            .then(() => {
                console.log("Movie was rated succesfully!");
                setOutput("Movie was rated succesfully!");
            })
            .catch(() => {
                console.log("Movie has already been rated by this person");
                setOutput("Movie has already been rated by this person");
            });
    }

    // Gets all the genres from the database (Mostly for the names)
    const fetchGenres = async () => {
        const res = await api.get("Genres");
        setGenre(res.data);
    }

    // Gets all the persons from the database
    const fetchPersons = async () => {
        const res = await api.get("Persons");
        setPerson(res.data);
    }

    // Compares the movies genre IDs with those from the database
    // Then Returns the matching genre names
    const DisplayGenres = () => {
        let ids = movie.genre_ids.map((x) => x);
        const filteredGenres = genre.filter(({ id }) => ids.includes(id)).map((x) => x.name)

        return (
            <GenreContainer>{filteredGenres.map((x) => <div>{x}</div>)}</GenreContainer>
        )
    }

    useEffect(() => {
        fetchGenres();
        fetchPersons();
        document.title = movie.title;
    }, []);

    const options =
        person.map((x) => ({
            value: x.id,
            label: x.firstName
        }))

    return (
        <>
            <MovieContainer style={
                {
                    backgroundImage: `url(${img + movie.backdrop_path}`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="bg">
                    <h1>{movie.title}</h1>
                    <DisplayGenres />
                    {/* Star rating that takes the movies average score, and rounds it to nearest half */}
                    <Rating style={{ maxWidth: 150, width: '100%' }} readOnly value={Math.round(movie.vote_average / 0.5) * 0.5 / 2.00} itemStyles={defaultItemStyles} />
                    {/* <p>{movie.vote_average}</p> */}
                    <Description>{movie.overview}</Description>
                </div>
                <div className="rating">
                    {/* Star rating that allows the user to rate a movie */}
                    <Rating items={10} style={{ maxWidth: 350 }} value={userRating} onChange={setUserRating} itemStyles={defaultItemStyles} />
                </div>
            </MovieContainer>
            <ButtonContainer>
                <Select options={options} onChange={(choice) => setSelect(choice.value)} theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        text: 'orangered',
                        primary25: '#45434d',
                        primary: '#45434d',
                    },
                })} />
                <Button onClick={() => Add()}>Add Movie</Button>
                <Button onClick={() => Rate()}>Rate Movie</Button>
                {showOutput ? <p>{output}</p> : null}
            </ButtonContainer>
        </>
    )
}

// Styling
const defaultItemStyles = {
    itemShapes: ThinStar,
    itemStrokeWidth: 2,
    activeFillColor: '#ffb23f',
    activeStrokeColor: '#e17b21',
    inactiveFillColor: '#FFFFFF00',
    inactiveStrokeColor: '#e17b21'
}

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const GenreContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 1.6rem;
    color: #37ff8b;
    gap: 0.69rem;
    align-items: center;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;

const Description = styled.p`
    width: 35vw;
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    min-height: 70vh;
    max-height: fit-content;
    margin-left: -10vw;
    margin-bottom: 1rem;
    backdrop-filter: blur(6px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    text-shadow: 2px 2px 0px #000;

    p {
        font-size: 1.15rem;
    }

    .bg {
        background-color: rgba(35, 34, 39, 0.69);
        width: fit-content;
        min-height: fit-content + 2rem;
        padding: 1.5rem;
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
    }

    .rating {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4rem;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;
