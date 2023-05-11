import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components/styling";
import api from "../Api";

// ALLOW USER TO ADD GENRE AND SELECT A USER

export default function Genre() {
    const { state: genre } = useLocation();
    const [genres, setGenre] = useState([]);

    const Add = async () => {
        await api.post(`Genre/AddPersonToGenre?personId=${6}&genreId=${genre.id}`)
            .then(() => {
                console.log("Genre was added succesfully!");
            })
            .catch(() => {
                console.log("That person already likes this genre");
            });
    };

    return (
        <>
            <h1>{genre.name}</h1>
            <p>{genre.description}</p>
            <Button onClick={() => Add()}>Link Genre</Button>
        </>
    );
}
