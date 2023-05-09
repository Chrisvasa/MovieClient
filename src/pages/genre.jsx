import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../components/styling";
import styled from "styled-components";
import api from "../Api";

export default function Genre() {
    const { state: genre } = useLocation();
    const [genres, setGenre] = useState([]);

    const Add = async () => {
        // console.log(genre.id)
        const result = await api.post(`Genre/AddPersonToGenre?personId=${6}&genreId=${genre.id}`);
        console.log(await result.data)

    }
    // const person = state.person;
    return (
        <>
            <h1>{genre.name}</h1>
            <p>{genre.description}</p>
            <Button onClick={() => Add()}>Link Genre</Button>
        </>
    );
}
