import { useState, useEffect } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import api from '../Api';
import { Div, Button } from '../components/styling'

export default function Genre() {
    const [showGenres, setShowGenres] = useState(false);
    const [genre, setGenre] = useState([]);

    const fetchData = async () => {
        const result = await api.get("Genres");
        setGenre(result.data);
    }

    // Navigation to another route, also sends the specific Genre that was clicked as a state
    const navigate = useNavigate();
    const GoToGenrePage = (genre) => { navigate(`${genre.id}`, { state: genre }) };

    // Toggles between true or false on showGenres
    const onClick = () => setShowGenres(showGenres => !showGenres);

    // Returns Genres when toggled
    const ReturnGenres = () => {
        return (
            <GenreContainer>
                {genre.map((g) =>
                    <Div key={g.id} className='genre' onClick={() => GoToGenrePage(g)}>
                        <h2>{g.name}</h2>
                        <p>ID: {g.id}</p>
                    </Div>)}
            </GenreContainer>
        )
    }

    useEffect(() => {
        fetchData();
        document.title = "Genres";
    }, []);

    return (
        <>
            <h1>Genres</h1>
            <div>
                <Button onClick={onClick}>Show Genres</Button>
                {showGenres ? <ReturnGenres /> : null}
            </div>
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
    
    .genre {
        width: 15rem;
    }
`;