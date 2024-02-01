import React, {useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helpers/FormHelper";
import {RegisterRequest} from "../../APIRequest/APIRequest";
import {useNavigate} from "react-router-dom";




const Registration = () => {
    let navigate=useNavigate();

    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef=useRef();

    const handleOnRegister=(e)=>{

        e.preventDefault();

        let email=emailRef.value;
        let firstName=firstNameRef.value;
        let lastName=lastNameRef.value;
        let mobile=mobileRef.value;
        let password=passwordRef.value;
        let photo="pngwing.com.png"

        if(IsEmail(email)){
            ErrorToast("Enter a valid email must be required!");
        }else if(IsEmpty(firstName)){
            ErrorToast("Enter first name must be required!");
        }else if(IsEmpty(lastName)){
            ErrorToast("Enter last name must be required!")
        }else if(!IsMobile(mobile)){
            ErrorToast("Enter a valid mobile number must be required!");
        }else if(IsEmpty(password)){
            ErrorToast("Password must be required!");
        }else{
            RegisterRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate("/login");
                }
            })
        }

    }



    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4>Sign Up</h4>
                            <hr/>
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>First Name</label>
                                        <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Mobile Number</label>
                                        <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Password</label>
                                        <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>

                                </div>
                                <div className="row mt-2 p-0">
                                    <div className="col-md-4 p-2">
                                        <button onClick={handleOnRegister}
                                                className="btn mt-3 w-100 float-end btn-primary animated fadeInUp" >Complete
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;