import React, {Fragment, lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Progress=lazy(()=>import("../components/Progress/Progress"))



const ProgressPage = () => {
    return (
        <Fragment>
            <MasterLayout>

                   <Suspense fallback={<LazyLoader/>}>
                       <Progress/>
                   </Suspense>

            </MasterLayout>
        </Fragment>
    );
};

export default ProgressPage;


