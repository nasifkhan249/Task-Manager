import React, {Fragment,Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import Dashboard from "../components/Dashboard/Dashboard";


const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;



