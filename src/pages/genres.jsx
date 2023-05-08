import { useState, useEffect } from 'react'
import api from '../Api';
import { Div } from '../components/styling'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

/*
 - Tillåt användaren att se alla Genres i DBn?
 - Tillåt användaren att gilla genrer / Koppla sig till en genre
*/
export default function Genre() {

    const [genre, setGenre] = useState([]);
    const fetchData = async () => {
        const result = await api.get("Genres");
        setGenre(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();
    const GoToGenrePage = (genre) => { navigate(`${genre.id}`, { state: genre }) };

    return (
        <>
            <h1>Genres</h1>
            <GenreContainer>
                {genre.map((g) =>
                    <Div key={g.id} className='genre' onClick={() => GoToGenrePage(g)}>
                        <h2>{g.name}</h2>
                        <p>ID: {g.id}</p>
                    </Div>)}
            </GenreContainer>
        </>
    );
}

const GenreContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.69rem;
`;