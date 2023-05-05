import { useState, useEffect } from 'react'
import api from '../Api';
import styled from "styled-components";

export default function getMovies() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const result = await api.get("Persons");
        setData(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <PersonContainer>
                {data.map((person) => (
                    <div key={person.id} className='person'>
                        <h1>{person.firstName} {person.lastName}</h1>
                        <h3>{person.email}</h3>
                    </div>
                ))}
            </PersonContainer>
        </>
    )
}

const PersonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5rem;
`;
