import { useState, useEffect } from 'react'
import './App.css'
import api from "./Api";
import { Route, Routes } from 'react-router-dom';


// [ ] Startsida som listar alla personer som finns i systemet automatiskt, det ska också finnas ett formulär för att skapa en ny person.
// [ ] Personerna är klickbara och vid klick kommer man till den personens egna sida och får upp en lista på alla genres som är kopplade till den personen samt alla filmer och dess rating.
// [ ] Under genres ska det gå att koppla en ny genre till en person med hjälp av ID och under filmer ska det gå att lägga till en ny film (länk) och rating.


function App() {

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
    {data.map((person) => (
      <div key={person.id} className='person'>
        <h1>{person.firstName} {person.lastName}</h1>
        <h3>{person.email}</h3>
      </div>
    ))}
    </>
  )
}

export default App
