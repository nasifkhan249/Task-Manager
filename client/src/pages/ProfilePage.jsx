import React, {Fragment, lazy, Suspense} from 'react';
import Profile from "../components/Profile/Profile";
import MasterLayout from "../components/MasterLayout/MasterLayout";


const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;



