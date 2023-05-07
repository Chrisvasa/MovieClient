import { useState, useEffect } from 'react'
import api from '../Api';
import styled from "styled-components";
import { useNavigate, Outlet } from 'react-router-dom';

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
                        <h4>ID: {g.id}</h4>
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

const Div = styled.div`
    padding: 0.5rem;
    width: 10rem;
    height: 6rem;
    border-radius: 0.69rem;
    background-color: #4c4c4c;
    box-shadow: 1px 1px 0px #3d3d3d,
                2px 2px 0px #3d3d3d,
                3px 3px 0px #3d3d3d,
                4px 4px 0px #3d3d3d,
                5px 5px 0px #3d3d3d,
                6px 6px 0px #3d3d3d;
    &:hover {
        background-color: #626262;
    }
`;