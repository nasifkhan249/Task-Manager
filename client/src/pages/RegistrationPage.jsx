import React, {Fragment, lazy, Suspense} from 'react';
const Registration=lazy(()=>import("../components/Registration/Registration"))


const RegistrationPage = () => {
    return (
        <Fragment>

                <Suspense>
                    <Registration/>
                </Suspense>

        </Fragment>
    );
};

export default RegistrationPage;


