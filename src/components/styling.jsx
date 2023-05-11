import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0.2rem;
    padding: 0.2rem;
    width: 20rem;
    height: 12rem;
    box-sizing: border-box;
    background: rgba(38, 37, 44, 0.58);
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    backdrop-filter: blur(6px);
    border-radius: 17px;
    cursor: pointer;
    user-select: none;
    font-weight: bolder;
    color: #fff;
    transition: all 0.2s cubic-bezier(0.77,0.2,0.05,1.0);
    &:hover {
        border: 1px solid black;
        transform: scale(1.05);
        background-color: rgba(38, 37, 44, 0.833);
    }
    &:active {
        transform: scale(0.95) rotateZ(1.7deg);
    }
    > h3, p {
        color: #676473;
    }
`;

export const Button = styled.button`
--border-right: 6px;
--text-stroke-color: rgba(255,255,255,0.6);
--animation-color: #37FF8B;
letter-spacing: 3px;
text-decoration: none;
font-size: 2rem;
font-family: "Arial";
position: relative;
text-transform: uppercase;
color: transparent;
-webkit-text-stroke: 1px var(--text-stroke-color);

&:hover {
color: var(--animation-color);
-webkit-text-stroke: 1px var(--animation-color);
filter: drop-shadow(0 0 23px var(--animation-color))
}
&:hover:before {
transform: translateX(15em);
}
.active {
box-sizing: border-box;
content: attr(data-text);
color: var(--animation-color);
border-right: var(--border-right) solid var(--animation-color);
overflow: hidden;
transition: all 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
-webkit-text-stroke: 1px var(--animation-color);
width: 100%;
inset: 0%;
filter: drop-shadow(0 0 23px var(--animation-color))
}

`;

export const Input = styled.input`
--text-stroke-color: rgba(255,255,255,0.6);
--animation-color: #37FF8B;
letter-spacing: 3px;
text-decoration: none;
font-size: 2rem;
font-family: "Arial";
position: relative;
text-transform: uppercase;
color: transparent;
-webkit-text-stroke: 1px var(--text-stroke-color);
background-color: #212121;
height: 2.5rem;
font-size: 2rem;
text-align: center;
border-radius: 5px;

&:focus {
color: #37FF8B;
background-color: #212121;
outline-color: rgba(255,255,255,0.6);
box-shadow: -3px -3px 15px #37FF8B;
transition: .1s;
transition-property: box-shadow;
}
`;