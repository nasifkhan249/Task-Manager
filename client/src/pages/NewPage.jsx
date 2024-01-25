import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import New from "../components/New/New";


const NewPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <New/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NewPage;



