import React, { useState, useEffect } from "react";
import { Rating, ThinStar } from '@smastrom/react-rating'
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select'

import api, { apiKey } from "../components/Api"
import { Button, MovieCard, Img, H3, CardContainer } from "../components/styling";

// Page for the clicked movie on movies page
// Allows for selection of a user and then adding and rating movies
export default function Movie() {
    const { state: movie } = useLocation(); // Gets the state sent from the previous page (Movie info)
    const img = 'https://image.tmdb.org/t/p/original' // Image URL
    const [genre, setGenre] = useState([]); // useState to get all genres from the DB
    const [person, setPerson] = useState([]); // useState to get all persons from the DB (For the select)
    const [userRating, setUserRating] = useState(0); // useState to keep track of ratings that the user might give a movie
    const [recommendation, setRecommendation] = useState({ results: [] });
    const [select, setSelect] = useState(); // Keeps track of the selected user
    const [showOutput, setShowOutput] = useState(false); // Check if output is showing or not
    const [showButton, setShowButton] = useState(true); // Check if output is showing or not
    const [output, setOutput] = useState(''); // Output if adding/rating movies was a success

    // Function to add movies to the database
    const Add = async () => {
        setShowOutput(true)
        // Creates a object for the add movie POST
        const m = {
            Id: movie.id,
            title: movie.title,
            link: `https://www.themoviedb.org/movie/${movie.id}`,
            genres: movie.genre_ids.map((x) => x).toString(),
            personId: select
        }
        // Posts the added movie to the Database
        await api.post(`Movies/Add?title=${m.title}&link=${m.link}&genres=${m.genres}&personId=${m.personId}`)
            .then(() => {
                setOutput("Movie was added succesfully!");
            })
            .catch((err) => {
                console.log(err.response.status);
                if (err.response.status === 500) {
                    setOutput("Movie already exists in Database");
                }
            });
    }

    // Function to allow users to rate movies
    const Rate = async () => {
        setShowOutput(true)
        if (userRating != 0) {
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
        else {
            setOutput("Please select a rating!");
        }
    }

    // Compares the movies genre IDs with those from the database
    // Then Returns the matching genre names
    const DisplayGenres = () => {
        let ids;
        try {
            ids = movie.genre_ids.map((x) => x);
        }
        catch {
            ids = movie.genres.map((x) => x.id);
        }
        const filteredGenres = genre.filter(({ id }) => ids.includes(id)).map((x) => x.name)

        return (
            <GenreContainer>{filteredGenres.map((x) => <div>{x}</div>)}</GenreContainer>
        )
    }

    // Displays the top 3 recommended movies for the current movie
    const DisplayMovies = () => {
        // Allows for navigation to the recommended movie if clicked
        const navigate = useNavigate();
        const GoToMoviePage = (movie) => {
            navigate(`/movies/${movie.id}`, { state: movie });
        };

        // Slices the movie and retrieves the top 3 results
        const movies = recommendation.results.slice(0, 3);
        return (
            movies.map((movie) => (
                <MovieCard key={movie.id} onClick={() => GoToMoviePage(movie)}>
                    <Img src={img + movie.backdrop_path} alt="" />
                    <div>
                        <h2>{movie.title}</h2>
                        <H3>{movie.vote_average}</H3>
                    </div>
                </MovieCard>
            ))
        )
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

    //Gets the recommended movies for the current movie
    const fetchRecommended = async () => {
        const res = await api.get(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`)
        setRecommendation(res.data);
    }

    // Check if user came from the profile link (Only shows added movies)
    // So disables the add button in that case
    const CheckMovie = () => {
        try {
            movie.genre_ids.length
            setShowButton(true);
        }
        catch {
            setShowButton(false);
        }
    }

    // On page load
    useEffect(() => {
        fetchGenres();
        fetchPersons();
        fetchRecommended();
        CheckMovie();
        document.title = movie.title;
    }, [movie]);

    // Creates the options for the user selection
    // Maps through the users and adds the ID as value, and the select label as the first name
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
                    borderRadius: 2,
                    colors: {
                        text: 'orangered',
                        primary25: '#45434d',
                        primary: '#45434d',
                    },
                })} />
                {/* Checks showButton status to decide if button is on or not */}
                {showButton ? <Button onClick={() => Add()}>Add Movie</Button> : null}
                <Button onClick={() => Rate()}>Rate Movie</Button>
                {showOutput ? <p>{output}</p> : null}
            </ButtonContainer>
            <Div>
                <h1>Recommendations</h1>
                <CardContainer>
                    <DisplayMovies />
                </CardContainer>
            </Div>
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

const Div = styled.div`
text-align: center;
h1 {
    color: #37ff8b;
}

`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;

    > * {
        min-width: 10rem;
    }
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

