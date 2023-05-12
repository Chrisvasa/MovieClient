import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

import { Button, Input } from '../components/styling';


export default function Movies() {
    const img = 'https://image.tmdb.org/t/p/original'
    const [movies, setMovies] = useState({ results: [] });
    const [page, setPage] = useState(1);
    //Fetches movies with given page number from TMDB
    const fetchMovies = async () => {
        const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d82f364f4fa13e9d2bc3e63a48f37d0c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=35`);
        setMovies(result.data);
    }

    // Gets movies that match the given search value
    const fetchMovieFromSearch = async () => {
        if (textInput != '') {
            const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d82f364f4fa13e9d2bc3e63a48f37d0c&language=en-US&query=${textInput}&include_adult=false&page=1`);
            setMovies(result.data);
        }
    }

    // Gets the value from the search bar and saves it
    const [textInput, setTextInput] = useState('');
    const handleChange = (event) => {
        if (event.target.value == '') {
            fetchMovies();
        }
        setTextInput(event.target.value);
    }

    const pageDown = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const pageUp = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMovies();
        document.title = "Movies";
    }, [page]);

    // Allows the user to navigate to the clicked movies page
    // Also sends all information about the movie as a state to the next page
    const navigate = useNavigate();
    const GoToMoviePage = (movie) => { navigate(`${movie.id}`, { state: movie }) };

    return (
        <>
            <SearchContainer>
                <Input type="text" placeholder='Search by name..' onChange={handleChange} />
                <Button onClick={fetchMovieFromSearch}>Search</Button>
                <p className='currentPage'>Page: {page} / {movies.total_pages}</p>
                <div className='buttons'>
                    <Button onClick={() => pageDown()}>BACK</Button>
                    <Button onClick={() => pageUp()}>NEXT</Button>
                </div>
            </SearchContainer>
            <MovieContainer>
                {movies.results.map((movie) => (
                    <MovieCard key={movie.id} className='movie' onClick={() => GoToMoviePage(movie)}>
                        <Img src={img + movie.backdrop_path} alt="" />
                        <div>
                            <h2>{movie.title}</h2>
                            <H3>{movie.vote_average}</H3>
                        </div>
                    </MovieCard>
                ))}
            </MovieContainer>
        </>
    )
}

// Styling
const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 0.5rem;
    gap: 0.5rem;

    > * {
        min-width: 25rem;
        max-width: 25rem;
    }
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.5rem;

        > * {
            width: fit-content;
            height: 4rem;
        }
    }

    .currentPage {
        text-align: center;
    }
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Img = styled.img`
    height: 18rem;
    width: 100%;
    object-fit: fill;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
`;

const MovieCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 25rem;
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
`;

const H3 = styled.h3`
    color: #37ff8b;
`;
