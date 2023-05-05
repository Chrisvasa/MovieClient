import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function RootLayout() {
    return (
        <RootLayerContainer>
            <Header>
                <Nav>
                    <Title>Movie Client</Title>
                    <NavLinkContainer>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="movies">Movies</NavLink>
                        <NavLink to="genres">Genres</NavLink>
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
    background-image: linear-gradient(45deg, #553c9a, #ee4b2b);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
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
    gap: 10px;

    > * {
        color: white;
        text-decoration: none;
    }

    NavLink:hover {
        color: red;
        background-color: green;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
