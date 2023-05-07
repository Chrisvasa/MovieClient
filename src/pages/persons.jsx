import { useState, useEffect } from 'react'
import api from '../Api';
import styled from "styled-components";
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

export default function Persons() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const result = await api.get("Persons");
        setData(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Allows navigation between routers without a navlink
    // Will send person data to the destination, so we dont have to fetch the data again
    const navigate = useNavigate();
    const GoToPersonPage = (person) => { navigate(`${person.id}`, { state: person }) };

    return (
        <>
            {/* Maps through the data and prints out First/Lastname and the users email */}
            <PersonContainer>
                {data.map((person) => (
                    <Div key={person.id} className='person' onClick={() => GoToPersonPage(person)}>
                        <h1>{person.firstName} {person.lastName}</h1>
                        <h3>{person.email}</h3>
                    </Div>
                ))}
            </PersonContainer>

            <div>
                <Outlet />
            </div>
        </>
    )
}

const PersonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2.5rem;
`;

const Div = styled.div`
    margin: 1rem;
    padding: 0.5rem;
    width: 20rem;
    height: 12rem;
    border-radius: 0.69rem;
    background-color: gray;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;    &:hover {
        background-color: lightgray;
    }
`;
