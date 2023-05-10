import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import api from "../Api";
import { Div, Button } from "../components/styling";

export default function Person() {
    const { state: person } = useLocation();
    const [genres, setGenre] = useState([]);
    const [movies, setMovie] = useState([]);
    const [ratings, setRating] = useState([]);
    const img = 'https://image.tmdb.org/t/p/original'

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
                    <img src="https://placehold.co/400x400" alt="" />
                    <div className="info">
                        <h2>{person.firstName} {person.lastName}</h2>
                        <h5>{person.email}</h5>
                    </div>
                    <div className="button-container">
                        <Button>Genres</Button>
                        <Button>Movies</Button>
                        <Button>Ratings</Button>
                    </div>
                </Header>
                <Main>
                    <Div className="main">
                        <h1>Liked Genres</h1>
                    </Div>
                    {/* {genres.map((genre) =>
                            <div key={genre.id} className="genre">
                                <h3>{genre.likedGenres}</h3>
                            </div>)} */}
                    {/* <Div>
                        <MovieContainer>
                            <h1>Movies added to DB</h1>
                            {movies.map((movie) =>
                                <MovieCard key={movie.id} className="movie">
                                    <h3>{movie.title}</h3>
                                    <h4>{movie.link}</h4>
                                </MovieCard>)}
                        </MovieContainer>
                    </Div>
                    <Div>
                        <h1>Rated movies</h1>
                        {ratings.map((ratedMovies) =>
                            <div>
                                <h3>{ratedMovies.movie.title}</h3>
                                <h4>{ratedMovies.movie.link}</h4>
                                <p>{ratedMovies.movieRating}</p>
                            </div>)}
                    </Div> */}
                </Main>
                {/* <Div className="extra">
                    <h1>Test</h1>
                </Div> */}
            </PersonContainer>
        </>
    );
}

const Main = styled.div`
    grid-column: 2/-1;
    grid-row: 1/2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const PersonContainer = styled.div`
    display:grid;
    grid-template-rows: 3fr 2fr;
    grid-template-columns: 1fr 2fr;
    height: 100vh;

    Div {
        width: 100%;
        height: 100%;
        &:hover {
            transform: scale(1)
        }
        > h3 {
            color: #fff;
        }
        > p, h5 {
            color: gray;
        }
        > h1 {
            color: #37ff8b;
        }
    }

`

const Header = styled.div`
grid-row: 1/-1;
grid-column: 1/2;
display: flex;
align-items: center;
flex-direction: column;
gap: 1rem;

img {
    height: 18rem;
    border-radius: 100%;
}
div {
    height: fit-content;
}
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        width: 10rem;
        margin-bottom: 1.5rem;
        /* background-color: transparent;
        border: 0px; */
    }
}
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25rem;
`;

const MovieCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0;
    padding: 0;
    width: 15rem;
    height: 25rem;
    box-sizing: border-box;
    background: rgba(38, 37, 44, 0.58);
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    backdrop-filter: blur(6px);
    border-radius: 17px;
    cursor: pointer;
    user-select: none;
    font-weight: bolder;
    color: #fff;
    transition: all 0.2s cubic-bezier(0.77,0.2,0.05,1.0);
    &:hover {
        border: 1px solid black;
        transform: scale(1.05);
        background-color: rgba(38, 37, 44, 0.833);
    }
    &:active {
        transform: scale(0.95) rotateZ(1.7deg);
    }
    > h3, p {
        color: #676473;
    }
`;