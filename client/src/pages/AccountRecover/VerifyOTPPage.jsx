import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const VerifyOTP=lazy(()=>import("../../components/AcountRecovery/Verify-OTP"))
const VerifyOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOTP/>
        </Suspense>
    );
};

export default VerifyOTPPage;