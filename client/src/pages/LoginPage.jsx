import React, {Fragment, lazy, Suspense} from 'react';
import Login from "../components/Login/Login";


const LoginPage = () => {
    return (
        <Fragment>
            <Suspense>
                <Login/>
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;




