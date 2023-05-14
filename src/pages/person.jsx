import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from 'react-select'

import api from "../components/Api";
import { Div, Button } from "../components/styling";

export default function Person() {
    const { state: person } = useLocation(); // Gets all the user information from the previous page (Name, email etc)
    // Keeps the data from the database
    const [genres, setGenre] = useState([]); // useState to keep track of a users liked genres
    const [allGenres, setAllGenres] = useState([]); // useState to keep track of all the genres
    const [movies, setMovie] = useState([]); // useState to keep track of a users added movies
    const [ratings, setRating] = useState([]); // useState to keep track of a users rated movies

    // useStates to keep track of which data to print out
    const [showGenres, setShowGenres] = useState(false);
    const [showMovies, setShowMovies] = useState(false);
    const [showStats, setShowStats] = useState(true);

    const [option, setOption] = useState([]);
    const [select, setSelect] = useState(''); // Keeps track of selected Genre to add
    const [selectedId, setSelectedId] = useState(null);
    const img = 'https://image.tmdb.org/t/p/original' // Base URL for images

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
    // Allows the user to like new genres
    const AddGenre = async () => {
        await api.post(`Genre/AddPersonToGenre?personId=${person.id}&genreId=${select}`)
            .then(() => {
                console.log("Genre was added succesfully!");
                fetchGenres();
            })
            .catch(() => {
                console.log("That person already likes this genre");
            });
    };

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
                    <Div key={g.id} className={`genres ${g.id === selectedId ? 'highlighted' : ''}`} onClick={() => handleClick(g.id)}>
                        <h2>{g.name}</h2>
                    </Div>)}
            </GenreContainer>
        )
        console.log("Genres filtered!");
    }

    // Allows the user to navigate to the clicked genres page
    // Also sends all information about the movie as a state to the next page
    const navigate = useNavigate();
    const GoToMoviePage = async (m) => {
        const movie = await api.get(`https://api.themoviedb.org/3/movie/${m}?api_key={apiKey}&language=en-US`)
        navigate(`/movies/${m}`, { state: movie.data })
    };

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
                    <Div key={genre.genreID} className="cont">
                        <h3>{genre.name}</h3>
                        {/* <p>{genre.description}</p> */}
                    </Div>)}
                <ButtonContainer>
                    <Button onClick={() => AddGenre()} onMouseUp={fetchGenres} className="btnGenre">Add Genre</Button>
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
        // Checks if the movie has been rated or only added to the DB by the user
        const CheckRating = (movie) => {
            if (movie.movieRating == null) {
                movie.movieRating = "Not yet rated by you."
            }
            return (
                movie.movieRating
            )
        }

        const movieID = (movieLink) => {
            const test = movieLink.split('movie/');
            return test[1];
        }

        return (
            <Content>
                <Title>Movies Added or Rated</Title>
                {tempMov.map((movie) =>
                    <div className="movie">
                        <h2 onClick={() => GoToMoviePage(movieID(movie.link))}>{movie.title}</h2>
                        <h4>{movie.link}</h4>
                        <p className="highlighted">{CheckRating(movie)}</p>
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
                        <h2 className="highlighted">{person.firstName} {person.lastName}</h2>
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

// Styling
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
    min-height: 45rem;
    max-height: fit-content;

    .highlighted{
            color: #37ff8b;
        }

    Div:first-child {
        .genres {
            height: fit-content;
            width: fit-content;
            padding: 0.4rem;
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
        > h5 {
            color: gray;
        }
    }
`

const Header = styled.div`
    grid-column: 1/2;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

.highlighted {
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
    }
}
`;
