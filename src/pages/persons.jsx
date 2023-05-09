import { useState, useEffect } from 'react'
import api from '../Api';
import { Div } from '../components/styling'
import styled from "styled-components";
import { useNavigate, Outlet } from 'react-router-dom';

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
    const GoToPersonPage = (person) => { navigate(`/person/${person.id}`, { state: person }) };

    return (
        <>
            {/* Maps through the data and prints out First/Lastname and the users email */}
            <PersonContainer>
                <Div>
                    <Button>+</Button>
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

const Button = styled.button`
    background: #393840;
    background-image: -webkit-linear-gradient(top, #393840, #232227);
    background-image: -moz-linear-gradient(top, #393840, #232227);
    background-image: -ms-linear-gradient(top, #393840, #232227);
    background-image: -o-linear-gradient(top, #393840, #232227);
    background-image: linear-gradient(to bottom, #393840, #232227);
    -webkit-border-radius: 60;
    -moz-border-radius: 60;
    border-radius: 60px;
    font-family: Arial;
    color: #676473;
    font-size: 30px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color:#fff;
        background: #19191c;
        background-image: -webkit-linear-gradient(top, #393840, #202024);
        background-image: -moz-linear-gradient(top, #393840, #202024);
        background-image: -ms-linear-gradient(top, #393840, #202024);
        background-image: -o-linear-gradient(top, #393840, #202024);
        background-image: linear-gradient(to bottom, #393840, #202024);
        text-decoration: none;
    }
`;

const PersonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`;
