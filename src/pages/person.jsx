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

    const [showGenres, setShowGenres] = useState(true);
    const [showMovies, setShowMovies] = useState(false);
    const [showRatings, setShowRatings] = useState(false);

    // Toggles between true or false on showGenres
    const onClick = (event) => {
        const id = event.target.id;
        setShowGenres(false);
        setShowMovies(false);
        setShowRatings(false);

        if (id === 'Genre') {
            setShowGenres(showGenres => !showGenres);
        }
        else if (id === 'Movie') {
            setShowMovies(showMovies => !showMovies);
        }
        else {
            setShowRatings(showRatings => !showRatings);
        }
    }

    const ReturnGenres = () => {
        return (
            <Content>
                <Title>Liked Genres</Title>
                {genres.map((genre) =>
                    <div key={genre.id} className="genre">
                        <h3>{genre.genre}</h3>
                    </div>)}
            </Content>
        )
    }

    const ReturnMovies = () => {
        return (
            <Content>
                <Title>Movies added to DB</Title>
                {movies.map((movie) =>
                    <div key={movie.id} className="movie">
                        <h3>{movie.title}</h3>
                        <h4>{movie.link}</h4>
                    </div>)}
            </Content>
        )
    }

    const ReturnRatings = () => {
        return (
            <Content>
                <Title>Rated movies</Title>
                {ratings.map((ratedMovies) =>
                    <div key={ratedMovies.id}>
                        <h3>{ratedMovies.movie.title}</h3>
                        <h4>{ratedMovies.movie.link}</h4>
                        <p>{ratedMovies.movieRating}</p>
                    </div>)}
            </Content>
        )
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
                        <Button onClick={onClick} id='Genre' className={showGenres === true ? 'active' : ''}>Genres</Button>
                        <Button onClick={onClick} id='Movie' className={showMovies === true ? 'active' : ''}>Movies</Button>
                        <Button onClick={onClick} id='Rating' className={showRatings === true ? 'active' : ''}>Ratings</Button>
                    </div>
                </Header>
                <ContentContainer>
                    <Div className="main">
                        {showGenres ? <ReturnGenres /> : null}
                        {showMovies ? <ReturnMovies /> : null}
                        {showRatings ? <ReturnRatings /> : null}
                    </Div>
                </ContentContainer>
                {/* <Div className="extra">
                    <h1>Test</h1>
                </Div> */}
            </PersonContainer>
        </>
    );
}

const Title = styled.h1`
    margin-bottom: 1rem;
    font-size: 3rem;
    color: #37ff8b;
`

const ContentContainer = styled.div`
    grid-column: 2/-1;
    grid-row: 1/2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: minmax(45rem, fit-content);
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const PersonContainer = styled.div`
    display:grid;
    grid-template-rows: 3fr 2fr;
    grid-template-columns: 1fr 2fr;
    height: 100vh;

    div:first-child{
        width: 100%;
        height: 100%;
        &:hover {
            transform: scale(1)
        }
    }
    div {
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

h2{
    color: #37ff8b;
}

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

    .active {
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
    width: 100%;
    inset: 0%;
    filter: drop-shadow(0 0 6px var(--animation-color))
    }

    button {
        width: 11rem;
        margin-bottom: 1.5rem;
        /* background-color: transparent;
        border: 0px; */
    }
}
`;
