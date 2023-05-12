import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from 'react-select'

import api from "../Api";
import { Div, Button } from "../components/styling";

export default function Person() {
    const { state: person } = useLocation();
    // Keeps the data from the database
    const [genres, setGenre] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [movies, setMovie] = useState([]);
    const [ratings, setRating] = useState([]);
    // useStates to keep track of which data to print out
    const [showGenres, setShowGenres] = useState(false);
    const [showMovies, setShowMovies] = useState(false);
    const [showStats, setShowStats] = useState(true);

    const [option, setOption] = useState([]);
    const [select, setSelect] = useState(''); // Keeps track of selected Genre to add
    const img = 'https://image.tmdb.org/t/p/original'

    // Fetches all the data necessary for the page - Rated Movies, Liked Genres etc
    const fetchData = async () => {
        console.log("Data fetched!")
        fetchGenres();

        const bresult = await api.get(`Movies/GetMoviesForPerson?Name=${person.firstName}`);
        setMovie(bresult.data);

        const cresult = await api.get(`Ratings/GetRatingsForPerson?Name=${person.firstName}`);
        setRating(cresult.data);
    }

    const fetchGenres = async () => {
        const result = await api.get(`Genres/FilterByPerson?Name=${person.firstName}`);
        setGenre(result.data);

        const dresult = await api.get(`Genres`);
        setAllGenres(dresult.data);

        DisplayGenres();
    }

    // Toggles between true or false on showGenres
    const onClick = (event) => {
        const id = event.target.id;
        setShowGenres(false);
        setShowMovies(false);
        setShowStats(false);

        if (id === 'Genre') {
            setShowGenres(showGenres => !showGenres);
        }
        else if (id === 'Movie') {
            setShowMovies(showMovies => !showMovies);
        }
        else {
            setShowStats(showRatings => !showRatings);
        }
    }

    const Add = async () => {
        await api.post(`Genre/AddPersonToGenre?personId=${person.id}&genreId=${select}`)
            .then(() => {
                console.log("Genre was added succesfully!");
                fetchGenres();
            })
            .catch(() => {
                console.log("That person already likes this genre");
            });
    };

    const [selectedId, setSelectedId] = useState(null);

    const DisplayGenres = () => {
        let ids = genres.map((x) => x.genreID);
        const filteredGenres = allGenres.filter(({ id }) => !ids.includes(id)).map((x) => x)
        // setOption(filteredGenres);

        const handleClick = (id) => {
            setSelectedId(id);
            setSelect(id);
        };

        return (
            <GenreContainer>
                {filteredGenres.map((g) =>
                    <Div key={g.id} className={`genres ${g.id === selectedId ? 'selected' : ''}`} onClick={() => handleClick(g.id)}>
                        <h2>{g.name}</h2>
                        {/* <p>ID: {g.id}</p> */}
                    </Div>)}
            </GenreContainer>
        )
        console.log("Genres filtered!");
    }

    // Allows the user to navigate to the clicked genres page
    // Also sends all information about the movie as a state to the next page
    const navigate = useNavigate();
    const GoToGenrePage = (genre) => { navigate(`/genres/${genre.genreID}`, { state: { genre: genre, person: person } }) };

    // On page Load
    useEffect(() => {
        document.title = person.firstName + "'s Profile";
        fetchData();
        DisplayGenres();
    }, []);

    // Prints this when Genre button is clicked
    const ReturnGenres = () => {
        return (
            <Content>
                <Title>Liked Genres</Title>
                {genres.map((genre) =>
                    <Div key={genre.genreID} className="cont" onClick={() => GoToGenrePage(genre)}>
                        <h3>{genre.name}</h3>
                        {/* <p>{genre.description}</p> */}
                    </Div>)}
                <ButtonContainer>
                    <Button onClick={() => Add()} onMouseUp={fetchGenres} className="btnGenre">Add Genre</Button>
                    <DisplayGenres />
                </ButtonContainer>
            </Content>
        )
    }

    // Prints this when Movie button is clicked
    const ReturnMovies = () => {
        // Gets the IDs from the movies in the ratings array
        let IDs = ratings.map(c => c.id);
        // Compares the IDs to the movie IDs and filters out duplicates
        const tempMov = ratings.concat(movies.filter(({ id }) => !IDs.includes(id)))

        function CheckRating(movie) {
            if (movie.movieRating == null) {
                movie.movieRating = "Not yet rated by you."
            }
            return (
                movie.movieRating
            )
        }
        return (
            <Content>
                <h1>Movies Added or Rated</h1>
                {tempMov.map((movie) =>
                    <div className="movie">
                        <h2>{movie.title}</h2>
                        <h4>{movie.link}</h4>
                        <p>{CheckRating(movie)}</p>
                    </div>)}
            </Content>
        )
    }

    // Prints this when Stats button is clicked (Also loaded by default)
    const ReturnStats = () => {
        let genreAmount = genres.length;
        let addedAmount = movies.length;
        let ratedAmount = ratings.length;
        let genreTot = 19 - genres.length
        return (
            <Content>
                <Title>Statistics</Title>
                <div>
                    <h3>Genres liked: {genreAmount} / 19</h3>
                    {/* <h3>Genres remaining: {genreTot}</h3> */}
                    <h3>Movies added: {addedAmount}</h3>
                    <h3>Movies rated: {ratedAmount}</h3>
                </div>
                <div>
                    <h3>Most watched movie:</h3>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quos.</h3>
                </div>
            </Content>
        )
    }
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
                        <Button onClick={onClick} id='Rating' className={showStats === true ? 'active' : ''}>Stats</Button>
                        <Button onClick={onClick} id='Genre' className={showGenres === true ? 'active' : ''}>Genres</Button>
                        <Button onClick={onClick} id='Movie' className={showMovies === true ? 'active' : ''}>Movies</Button>
                    </div>
                </Header>
                <ContentContainer>
                    <Div className="main">
                        <div>
                            {showGenres ? <ReturnGenres /> : null}
                            {showMovies ? <ReturnMovies /> : null}
                            {showStats ? <ReturnStats /> : null}
                        </div>
                    </Div>
                </ContentContainer>
                {/* <Div className="extra">
                    <h1>Test</h1>
                </Div> */}
            </PersonContainer>
        </>
    );
}

const GenreContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.69rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

// Styling
const Title = styled.h1`
    margin-bottom: 1rem;
    font-size: 3rem;
    color: #37ff8b;
`

const ContentContainer = styled.div`
    grid-column: 2/-1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 45rem;
    max-height: 100vh;

    .selected {
            color: #37ff8b;
        }

    Div:first-child {
        .genres {
            height: fit-content;
            width: fit-content;
            padding: 0.4rem;
        h3 {
            color: #37ff8b;
            box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 4px 8px, rgba(0, 0, 0, 0.09) 0px 12px 16px;
            border-top-left-radius: 17px;
            border-top-right-radius: 17px;
        }
        }
    }

    .btnGenre {
        width: 20rem;
        align-self: center;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    .cont{
        height: fit-content;
        h3 {
            color: #37ff8b;
            box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 4px 8px, rgba(0, 0, 0, 0.09) 0px 12px 16px;
            border-top-left-radius: 17px;
            border-top-right-radius: 17px;
        }
        h4, p {
            width: 100%;
        }
    }
    .movie {
        p {
            color: #37ff8b;
        }
        h4 {
            color: #676473;
        }
        h2 {
            color: #aba6bf;
        }
    }
`;

const PersonContainer = styled.div`
    display:grid;
    grid-template-rows: 1fr;
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
    transition: all 0.4s cubic-bezier(0.77,0.2,0.05,1.0);

    .active {
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    overflow: hidden;
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
        &:hover {
            cursor: pointer;
        }
    }
}
`;
