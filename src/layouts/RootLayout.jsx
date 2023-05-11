import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Breadcrumbs from '../components/Breadcrumbs';

//The standard layout for every page with a header and some NavLinks to move to other sites
export default function RootLayout() {
    return (
        <RootLayerContainer>
            <Header>
                <Nav>
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <Title>Movie Client</Title>
                    </NavLink>
                    <NavLinkContainer>
                        <NavLink to="/" id="link" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Home</NavLink>
                        <NavLink to="movies" id="link" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Movies</NavLink>
                        <NavLink to="genres" id="link" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Genres</NavLink>
                    </NavLinkContainer>
                </Nav>
            </Header>
            {/* <Breadcrumbs /> */}

            <Main>
                <Outlet />
            </Main>
        </RootLayerContainer>
    );
}

// Styling

const Main = styled.main`
    margin-left: 10vw;
    width: 80vw;
`;

const RootLayerContainer = styled.div`
    height: 100vh;
`;

const Title = styled.h1`
        --text-stroke-color: rgba(255,255,255,0.6);
        --animation-color: #37FF8B;
        letter-spacing: 3px;
        text-decoration: none;
        font-size: 3.5rem;
        font-family: "Arial";
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px var(--text-stroke-color);
        -webkit-text-stroke: 1px var(--animation-color);
        box-sizing: border-box;
        content: attr(data-text);
        color: var(--animation-color);
        transition: 0.25s;
        filter: drop-shadow(0 0 15px var(--animation-color));
        &:hover {
            border-right: 6px solid var(--animation-color);
            filter: drop-shadow(0 0 28px var(--animation-color));
        }
`

const Header = styled.header`
    text-decoration: none;
    min-height: 5rem;

    &.title {
        color: green;
    }
`;

const NavLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 2.5rem;
    gap: 10px;

    > * {
        --border-right: 6px;
        --text-stroke-color: rgba(255,255,255,0.6);
        --animation-color: #37FF8B;
        --fs-size: 2em;
        letter-spacing: 3px;
        text-decoration: none;
        font-size: 2rem;
        font-family: "Arial";
        position: relative;
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px var(--text-stroke-color);
    }

    #link:hover {
        color: var(--animation-color);
        -webkit-text-stroke: 1px var(--animation-color);
        filter: drop-shadow(0 0 23px var(--animation-color))
    }
    #link:hover:before {
        transform: translateX(15em);
    }
    a.active {
        box-sizing: border-box;
        content: attr(data-text);
        color: var(--animation-color);
        border-right: var(--border-right) solid var(--animation-color);
        overflow: hidden;
        transition: 0.5s;
        -webkit-text-stroke: 1px var(--animation-color);
        width: 100%;
        inset: 0%;
        filter: drop-shadow(0 0 23px var(--animation-color))
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    width: 95vw;
    margin-left: 2.5vw;
`;
