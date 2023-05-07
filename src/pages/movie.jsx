import { useState, useEffect } from 'react'
import api from '../Api';
import styled from "styled-components";

/* 
 - Hämta filmer från TMDB
 - Tillåt användaren att filtrera bland dessa genom att skriva in en genre (eller genreid?)
 - Tillåt användaren att klicka på filmen för att få upp mer info om filmen, samt möjligheten att kunna lägga 
 till filmen i databasen (Visa ifall filmen redan finns eller inte)
 - Tillåt användaren att ge rating till filmer (Kolla så de inte redan givit filmen en rating)
 */

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
