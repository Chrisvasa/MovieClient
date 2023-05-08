import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

//Pages
import Movies from "./pages/movies";
import Persons from "./pages/persons";
import Person from "./pages/person";
import Genres from './pages/genres';
import Genre from './pages/genre';
import ErrorPage from './error-page';
import App from "./App"
import './index.css'

//Layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />}>
      <Route path='/' element={<Persons />} />
      <Route path=':id' element={<Person />} />
      <Route path='movies' element={<Movies />} />
      <Route path='genres' element={<Genres />} />
      <Route path='/genres/:id' element={<Genre />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
