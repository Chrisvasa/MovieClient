import { useState, useEffect } from 'react'
import api from './Api';

export default function getMovies() {
    const [movie, setMovie] = useState([]);

  
    useEffect(() => {
        const fetchMovie = async () => {
            const result = await api.get("Persons");
            setMovie(result.data);
          };
          fetchMovie();
    }, []);

    return movie;
}
