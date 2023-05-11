import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useNavigate, Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import '@smastrom/react-rating/style.css'

import api from './Api';
import { Div, Button, Input } from './components/styling'

Modal.setAppElement('#root')

export default function App() {
  const [persons, setPerson] = useState([]);
  const fetchData = async () => {
    const result = await api.get("Persons");
    setPerson(result.data);
  }

  useEffect(() => {
    fetchData();
    document.title = "Movie Client";
  }, []);

  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Allows navigation between routers without a navlink
  // Will send person data to the destination, so we dont have to fetch the data again
  const navigate = useNavigate();
  const GoToPersonPage = (person) => { navigate(`/person/${person.id}`, { state: person }) };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const resetData = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  const AddPerson = async () => {
    if (firstName != '' && lastName != '' && email != '') {
      const result = await api.post(`Persons/Add?FirstName=${firstName}&LastName=${lastName}&Email=${email}`)
        .then(() => {
          console.log("Person was added succesfully!");
          fetchData();
          resetData();
        })
        .catch(() => {
          console.log("Person with that email already exists in Database");
        });
    }
    else {
      console.log("Fill all data");
    }
  }

  return (
    <>
      {/* Maps through the data and prints out First/Lastname and the users email */}
      <PersonContainer>
        <Div onClick={openModal}>
          <AddButton>+</AddButton>
        </Div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Register Person"
        >
          <h2>Register User</h2>
          {/* <button onClick={closeModal}>close</button> */}
          <div>Enter your information below</div>
          <form onSubmit={() => event.preventDefault()}>
            <h4>First Name</h4>
            <Input value={firstName} onChange={() => setFirstName(event.target.value)} />
            <h4>Last Name</h4>
            <Input value={lastName} onChange={() => setLastName(event.target.value)} />
            <h4>Email</h4>
            <Input value={email} onChange={() => setEmail(event.target.value)} />
            <br />
            <br />
            <Button onClick={() => AddPerson()}>Submit</Button>
          </form>
        </Modal>
        {persons.map((person) => (
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

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(35, 34, 39, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#232227',
    color: '#37ff8b'
  }
};

const AddButton = styled.button`
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
    color: #37ff8b;
    font-size: 30px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #37ff8b;
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

    h1{
        color: #37ff8b;
    }
`;