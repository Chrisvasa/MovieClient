import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

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
                        <NavLink to="/" id="link">Home</NavLink>
                        <NavLink to="movies" id="link">Movies</NavLink>
                        <NavLink to="genres" id="link">Genres</NavLink>
                    </NavLinkContainer>
                </Nav>
            </Header>

            <main>
                <Outlet />
            </main>
        </RootLayerContainer>
    );
}

const RootLayerContainer = styled.div`
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 70px;
    font-weight: 700;
    text-shadow: 5px 1px 3px rgba(0,0,0,0.5);
    background-image: linear-gradient(45deg, #553c9a, #ee4b2b);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    &:hover {
        text-shadow: 6px 3px 2px rgba(0,0,0,0.5);
    }
`

const Header = styled.header`
    text-decoration: none;
    background-color: #0f0f0ff4;
    min-height: 5rem;

    &.title {
        color: green;
    }
`;

const NavLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    gap: 10px;

    > * {
        color: white;
        text-decoration: none;
    }

    #link:hover {
        color: red;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
