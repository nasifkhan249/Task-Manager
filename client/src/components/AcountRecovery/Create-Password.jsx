import  {Fragment, useRef} from 'react';
import { getEmail, getOTP } from '../../helpers/SessionHelper';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { ResetNewPass } from '../../APIRequest/APIRequest';
import { useNavigate } from 'react-router-dom';




const CreatePassword = () => {
    let passwordRef,confirmPasswordRef=useRef();
    const navigate=useNavigate();

    const ResetPass=()=>{
        let password=passwordRef.value;
        let confirmPassword=confirmPasswordRef.value;

        if(IsEmpty(password)){
            ErrorToast("Password must be required")
        }else if(IsEmpty(confirmPassword)){
            ErrorToast("confirm password must be required")
        }else if(password!==confirmPassword){
            ErrorToast("Password and Confirm password must be provide same");
        }else{
            ResetNewPass(getEmail(),getOTP(),password).then((result)=>{
                if(result===true){
                    sessionStorage.clear();
                    navigate("/Login");
                }
            })
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input readOnly={true} defaultValue={getEmail()} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>Your otp address</label>
                                <input readOnly={true} defaultValue={getOTP()} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input ref={(input)=>passwordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input)=>confirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={ResetPass} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default CreatePassword;