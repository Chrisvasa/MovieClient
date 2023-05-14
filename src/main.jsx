import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

//Pages
import Movies from "./pages/movies";
import Movie from "./pages/movie";
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
      <Route path='/' element={<App />} />
      <Route path='/person/:id' element={<Person />} />
      <Route path='movies' element={<Movies />} />
      <Route path='movies/:id' element={<Movie />} />
      <Route path='genres' element={<Genres />} />
      <Route path='genres/:id' element={<Genre />} />

      <Route path="*" element={ErrorPage} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
