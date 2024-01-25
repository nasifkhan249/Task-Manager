import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import Completed from "../components/Completed/Completed";


const CompletedPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <Completed/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletedPage;
