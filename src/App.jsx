import { useState, useEffect } from 'react'
import api from "./Api";


// [ ] Startsida som listar alla personer som finns i systemet automatiskt, det ska också finnas ett formulär för att skapa en ny person.
// [ ] Personerna är klickbara och vid klick kommer man till den personens egna sida och får upp en lista på alla genres som är kopplade till den personen samt alla filmer och dess rating.
// [ ] Under genres ska det gå att koppla en ny genre till en person med hjälp av ID och under filmer ska det gå att lägga till en ny film (länk) och rating.


function App() {

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await api.get("Genres/FilterByGenre?Name=Action");
    setData(result.data);
  }

  useEffect(() => {
    console.log("Loaded");
    fetchData();
  }, []);

  return (

    <>
      {data.map((movie) => (
        <div key={movie.id} className='person'>
          <h1>{movie.genre}</h1>
          <h2>{movie.matches}</h2>
          {movie.links.map((link) => (
            <div>
              <a href="{link}">{link}</a>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default App
