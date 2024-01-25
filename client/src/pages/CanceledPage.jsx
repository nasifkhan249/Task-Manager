import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import Canceled from "../components/Cancled/Canceled";


const CanceledPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <Canceled/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CanceledPage;




