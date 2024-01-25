import React, {Fragment, Suspense} from 'react';
import NotFound from "../components/NotFound/NotFound";

const Page404 = () => {
    return (
        <Fragment>
            <Suspense>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default Page404;



