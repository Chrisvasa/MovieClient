import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import api from "../Api";

export default function Person() {
    const { state: person } = useLocation();
    const [genres, setGenre] = useState([]);
    const [movies, setMovie] = useState([]);
    const [ratings, setRating] = useState([]);

    const fetchData = async () => {
        const result = await api.get(`Genres/FilterByPerson?Name=${person.firstName}`);
        setGenre(result.data);

        const bresult = await api.get(`Movies/GetMoviesForPerson?Name=${person.firstName}`);
        setMovie(bresult.data);

        const cresult = await api.get(`Ratings/GetRatingsForPerson?Name=${person.firstName}`);
        setRating(cresult.data);
    }

    // On page Load
    useEffect(() => {
        console.log("Loaded");
        fetchData();
    }, []);
    // const person = state.person;
    return (
        <>
            <PersonContainer>
                <Header>
                    <h1>Personal Page of:</h1>
                    <h2>{person.firstName}</h2>
                </Header>
                <h1>Liked Genres</h1>
                {genres.map((genre) =>
                    <div key={genre.id} className="genre">
                        <h4>{genre.likedGenres}</h4>
                    </div>)}

                <h1>Movies added to DB</h1>
                {movies.map((movie) =>
                    <div key={movie.id} className="movie">
                        <h4>{movie.title}</h4>
                    </div>)}
                <h1>Rated movies</h1>
                {ratings.map((ratedMovies) =>
                    <div>
                        {ratedMovies.moviesRatings.map((rating) =>
                            <div>
                                <h4>{rating}</h4>
                            </div>)}
                    </div>)}
            </PersonContainer>
        </>
    );
}

const PersonContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1e1e1e;

`

const Header = styled.div`
display: flex;
flex-direction: column;

`;