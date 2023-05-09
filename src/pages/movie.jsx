import { useState, useEffect } from "react";
import api from "../Api"
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import { Button } from "../components/styling";

export default function Movie() {
    const { state: movie } = useLocation();
    const img = 'https://image.tmdb.org/t/p/original'

    const Add = async () => {
        const m = {
            title: movie.title,
            link: `https://www.themoviedb.org/movie/${movie.id}`,
            genres: movie.genre_ids.map((x) => x).toString(),
            personId: 5
        }
        console.log(m.genres)
        const result = await api.post(`Movies/Add?title=${m.title}&link=${m.link}&genres=${m.genres}&personId=${m.personId}`);
        console.log(result.data)

    }
    return (
        <>
            <MovieContainer>
                <h1>{movie.title}</h1>
                <Img src={img + movie.backdrop_path} alt="" />
                <Desc>{movie.overview}</Desc>
            </MovieContainer>
            <div>
                <Button onClick={() => Add()}>Add Movie</Button>
                <Button>Rate Movie</Button>
            </div>
        </>
    )
}

const Desc = styled.p`
    width: 50vw;
`;

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    width: 100vw;
    height: 40vh;
    padding: 1rem;
    margin-left: -10vw;
    background-color: rgba(38, 37, 44, 0.58);
    backdrop-filter: blur(6px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Img = styled.img`
    border-radius: 7px;
    object-fit: scale-down;
    overflow: hidden;
`;