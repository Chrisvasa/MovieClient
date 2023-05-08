import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"

export default function Movie() {
    const { state: movie } = useLocation();
    const img = 'https://image.tmdb.org/t/p/original'
    return (
        <>
            <MovieContainer>
                <h1>{movie.title}</h1>
                <Img src={img + movie.backdrop_path} alt="" />
                <Desc>{movie.overview}</Desc>
            </MovieContainer>
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