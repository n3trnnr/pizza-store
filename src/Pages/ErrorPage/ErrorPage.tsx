import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const routerError = useRouteError() as Error
    console.log('routerError - ', routerError);

    return (
        <>
            <div>{routerError?.message}</div>
            ErrorPage
        </>
    );
}

export default ErrorPage;