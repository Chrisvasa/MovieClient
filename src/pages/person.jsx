import { useLocation } from "react-router-dom";

export default function Person() {
    const { state: person } = useLocation();
    // const person = state.person;
    return (
        <>
            <h1>{person.firstName}</h1>
            <p>{person.email}</p>
        </>
    );
}