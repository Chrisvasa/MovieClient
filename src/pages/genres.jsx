import { useState, useEffect } from 'react'
import styled from "styled-components";

import api from '../components/Api';
import { Div } from '../components/styling'

//Function that prints out all the genre names, their ID and descriptions
export default function Genre() {
    const [genre, setGenre] = useState([]);

    const fetchData = async () => {
        const result = await api.get("Genres");
        setGenre(result.data);
    }

    useEffect(() => {
        fetchData();
        document.title = "Genres";
    }, []);

    return (
        <GenreContainer>
            {genre.map((g) =>
                <Div key={g.id} className='genre' onClick={() => GoToGenrePage(g)}>
                    <h2>{g.name}</h2>
                    <p className='id'>ID: {g.id}</p>
                    <p>{g.description}</p>
                </Div>)}
        </GenreContainer>
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
        height: 23rem;
    }

    .id {
        color: #37ff8b;
    }
`;