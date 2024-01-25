import React, {Fragment, Suspense} from 'react';
import SendOTP from "../components/AcountRecovery/Send-OTP";


const ForgetpassPage = () => {
    return (
        <Fragment>
            <Suspense>
                <SendOTP/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetpassPage;




