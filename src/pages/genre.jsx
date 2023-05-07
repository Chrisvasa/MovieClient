import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import api from "../Api";

export default function Person() {
    const { state: person } = useLocation();
    const [genres, setGenre] = useState([]);

    const fetchData = async () => {
        // const result = await api.get(`Genres/FilterByPerson?Name=${person.firstName}`);
        // setGenre(result.data);

    }

    // On page Load
    useEffect(() => {
        console.log("Loaded");
        fetchData();
    }, []);
    // const person = state.person;
    return (
        <>
            <h1>Test</h1>
        </>
    );
}
