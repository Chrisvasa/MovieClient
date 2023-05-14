import { useRouteError } from "react-router-dom";

// Error page if user is trying to access a site that does not exist.
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occured</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}