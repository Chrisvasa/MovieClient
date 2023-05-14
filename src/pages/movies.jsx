import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

import { Button, Input, MovieCard, Img, H3, CardContainer } from '../components/styling';

// Function that shows all the movies from TMDB and allows you to search for specific movies 
// and click the movies to go to that specific movies page
export default function Movies() {
    const img = 'https://image.tmdb.org/t/p/original' // BASE URL for images
    const [movies, setMovies] = useState({ results: [] }); // useState to store all the movies
    const [page, setPage] = useState(1); // useState to keep track of the current page - Set to 1 by default

    //Fetches movies with given page number from TMDB
    const fetchMovies = async () => {
        const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key={apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
        setMovies(result.data);
    }

    // Gets movies that match the given search value
    const fetchMovieFromSearch = async () => {
        if (textInput != '') {
            const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key={apiKey}&language=en-US&query=${textInput}&include_adult=false&page=1`);
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

    // On page load
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
            <CardContainer>
                {movies.results.map((movie) => (
                    <MovieCard key={movie.id} className='movie' onClick={() => GoToMoviePage(movie)}>
                        <Img src={img + movie.backdrop_path} alt="" />
                        <div>
                            <h2>{movie.title}</h2>
                            <H3>{movie.vote_average}</H3>
                        </div>
                    </MovieCard>
                ))}
            </CardContainer>
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
