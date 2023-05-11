import { useState, useEffect } from "react";
import api from "../Api"
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import { Button } from "../components/styling";

export default function Movie() {
    const { state: movie } = useLocation();
    const img = 'https://image.tmdb.org/t/p/original'
    const [genre, setGenre] = useState([]);

    const Add = async () => {
        const m = {
            title: movie.title,
            link: `https://www.themoviedb.org/movie/${movie.id}`,
            genres: movie.genre_ids.map((x) => x).toString(),
            personId: 5
        }
        // console.log(m.genres)
        await api.post(`Movies/Add?title=${m.title}&link=${m.link}&genres=${m.genres}&personId=${m.personId}`)
            .then(() => {
                console.log("Movie was added succesfully!");
            })
            .catch(() => {
                console.log("Movie already exists in Database");
            });
    }

    const fetchGenres = async () => {
        const data = await api.get("Genres");
        setGenre(data.data);
    }

    const DisplayGenres = () => {
        let ids = movie.genre_ids.map((x) => x);
        const filteredGenres = genre.filter(({ id }) => ids.includes(id)).map((x) => x.name)

        return (
            <GenreContainer>{filteredGenres.map((x) => <div>{x}</div>)}</GenreContainer>
        )
    }

    useEffect(() => {
        fetchGenres();
        document.title = movie.title;
    }, []);

    return (
        <>
            <MovieContainer style={
                {
                    backgroundImage: `url(${img + movie.backdrop_path}`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}>
                <div className="bg">
                    <h1>{movie.title}</h1>
                    <DisplayGenres />
                    {/* <p>{movie.vote_average}</p> */}
                    <Description>{movie.overview}</Description>
                </div>
            </MovieContainer>
            <ButtonContainer>
                <Button onClick={() => Add()}>Add Movie</Button>
                <Button>Rate Movie</Button>
            </ButtonContainer>
        </>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const GenreContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 1.6rem;
    color: #37ff8b;
    gap: 0.69rem;
    align-items: center;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;


const Description = styled.p`
    width: 35vw;
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    min-height: 70vh;
    max-height: fit-content;
    margin-left: -10vw;
    margin-bottom: 1rem;
    backdrop-filter: blur(6px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;

    h1 {
    }

    .bg {
        background-color: rgba(35, 34, 39, 0.6);
        width: fit-content;
        min-height: fit-content + 2rem;
        padding: 1.5rem;
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
    }

`;
