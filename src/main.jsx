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
import Movies from "./pages/movie";
import Person from "./pages/person";
import Genre from './pages/genre';
import ErrorPage from './error-page';
import App from "./App"
import './index.css'

//Layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path='' element={<Person />}>
        <Route path='Person:id' />
      </Route>
      <Route path='movies' element={<App />} />
      <Route path='genres' element={<Genre />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
