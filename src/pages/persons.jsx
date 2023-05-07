import { useState, useEffect } from 'react'
import api from '../Api';
import styled from "styled-components";
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

export default function Persons() {
    const [person, setPerson] = useState([]);
    const fetchData = async () => {
        const result = await api.get("Persons");
        setPerson(result.data);
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
                <Div>
                    <h1>Create New User</h1>
                </Div>
                {person.map((person) => (
                    <Div key={person.id} className='person' onClick={() => GoToPersonPage(person)}>
                        <h1>{person.firstName} {person.lastName}</h1>
                        <h3>{person.email}</h3>
                        <p>Click to view</p>
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
