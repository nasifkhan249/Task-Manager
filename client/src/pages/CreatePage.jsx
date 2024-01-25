import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import Create from "../components/Create/Create";




const CreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <Create/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CreatePage;



