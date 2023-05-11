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
            <Div2>{filteredGenres.map((x) => <div>{x}</div>)}</Div2>
        )
    }

    useEffect(() => {
        fetchGenres();
        document.title = movie.title;
    }, []);

    return (
        <>
            <MovieContainer>
                <h1>{movie.title}</h1>
                <Img src={img + movie.backdrop_path} alt="" />
                <DisplayGenres />
                <Desc>{movie.overview}</Desc>
            </MovieContainer>
            <Div>
                <Button onClick={() => Add()}>Add Movie</Button>
                <Button>Rate Movie</Button>
            </Div>
        </>
    )
}

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const Div2 = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 1.6rem;
    color: #37ff8b;
    gap: 1rem;
    justify-content: center;
`;


const Desc = styled.p`
    width: 50vw;
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    width: 100vw;
    min-height: 40vh;
    max-height: fit-content;
    padding: 1rem;
    margin-left: -10vw;
    background-color: rgba(38, 37, 44, 0.58);
    backdrop-filter: blur(6px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h1 {
        width: 100%;
        text-align: center;
    }
`;

const Img = styled.img`
    border-radius: 17px;
    height: 35rem;
    object-fit: contain;
    overflow: hidden;
`;