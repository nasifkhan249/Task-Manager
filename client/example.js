import { useEffect, useRef } from "react";
import { ProfileDetailsRequest, ProfileUpdateRequest } from "../../APIRequest/APIRequest";
import { useSelector } from 'react-redux';
import { ErrorToast, IsEmail, IsEmpty, IsMobile, getBase64 } from "../../helpers/FormHelper";
import {useNavigate} from "react-router-dom";



const Profile = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef();

    useEffect(()=>{
        (async()=>{
            await ProfileDetailsRequest();
        })()
    },[]);

    const ProfileData=useSelector((state)=>state.profile.value);


    const navigate=useNavigate();

    const previewImg=async()=>{
        let ImgFile=userImgRef.files[0];
        await getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }

    const handleUpdate=()=>{
        let email=emailRef.value;
        let firstName=firstNameRef.value;
        let lastName=lastNameRef.value;
        let mobile=mobileRef.value;
        let password=passwordRef.value;
        let photo= userImgView.src;

        if(IsEmail(email)){
            ErrorToast("Valid email must be required");
        }else if(IsEmpty(firstName)){
            ErrorToast("First name must be required");
        }else if(IsEmpty(lastName)){
            ErrorToast("Last Name must be required");
        }else if(!IsMobile(mobile)){
            ErrorToast("Valid mobile number required");
        }else if(IsEmpty(password)){
            ErrorToast("Password must be required");
        }else{
             ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate("/");
                }
            })
        }
    }


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input)=>userImgView=input} className="icon-nav-img-lg"
                                src={ProfileData['photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={previewImg} ref={(input)=>userImgRef=input} placeholder="User Email" defaultValue={ProfileData['photo']} className="form-control animated fadeInUp" type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()}  ref={(input)=>emailRef=input} readOnly={true} defaultValue={ProfileData['email']} placeholder="User Email"className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()}  ref={(input)=>firstNameRef=input} defaultValue={ProfileData['firstName']} placeholder="First Name"className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()}  ref={(input)=>lastNameRef=input} defaultValue={ProfileData['lastName']} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()}  ref={(input)=>mobileRef=input} defaultValue={ProfileData['mobile']} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()}  ref={(input)=>passwordRef=input} defaultValue={ProfileData['password']} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={handleUpdate} className="btn w-100 float-end btn-primary animated fadeInUp">Update</button>
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

export default Profile;