import axios from 'axios';
import {ErrorToast, SuccessToast} from "../helpers/FormHelper";
import store from '../redux/store/store';
import { HideLoader, ShowLoader } from '../redux/state-slice/settings-slice';
import getTokenFromCookie from "../helpers/unauthorized.js";
import { setEmail, setOTP, setToken, setUserDetails} from "../helpers/SessionHelper.js";
import { setCanceledTask, setCompletedTask, setProgressTask } from '../redux/state-slice/task-slice.js';
import { setSummary } from '../redux/state-slice/summary-slice.js';
import { setProfile } from '../redux/state-slice/profile-slice.js';
let userAuth={headers:{"token":getTokenFromCookie()}}

const BaseURL="";


export async function CreateTask(title,description,status){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/createtask";
        let postBody={
            title:title,
            description:description,
            status:status
        };
        let result=await axios.post(URL,postBody,userAuth);
        store.dispatch(HideLoader());
        if(result.status===200){
            SuccessToast("New Task Created");
            return true;
        }else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }catch (e) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader())
        return false;
    }
}


export async function LoginRequest(email,password){
    store.dispatch(ShowLoader())
        try {
            let URL=BaseURL+"/api/v1/signin";
            let PostBody={
                email:email,
                password:password
            }

            let result=await axios.post(URL,PostBody);
            store.dispatch(HideLoader())
            if(result.data.status==="success"){
                setToken(result.data['token']);
                setUserDetails(result.data['data'])
                SuccessToast("Login Success")
                return true;
            }else{
                ErrorToast("Invalid Email or Password")
                return  false;
            }
        } catch (e) {
            ErrorToast("Something Went Wrong");
            store.dispatch(HideLoader())
            return false;
        }
}



export async function RegisterRequest(email, firstName, lastName, mobile, password, photo) {
    store.dispatch(ShowLoader())
    try {
        let URL = BaseURL + "/api/v1/signup";
        let PostBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            password: password,
            photo: photo
        }

        

       let result=await axios.post(URL, PostBody);
       store.dispatch(HideLoader())
                if (result.status === 200) {
                    if (result.data['status'] === "fail") {
                        if (result.data['data']['keyPattern']['email'] === 1) {
                            ErrorToast("This email is already exiting")
                            return false
                        } else {
                            ErrorToast("Something went wrong");
                            return false
                        }
                    } else {
                        SuccessToast("Registration Success");
                        return true;
                    }
                } else {
                    ErrorToast("Something went wrong1");
                    return false
                }
    }catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something went wrong2");
        console.log(e);
        return false;
    }
}





export async function TaskListByStatus(status){
    store.dispatch(ShowLoader());
        try {
            let URL=BaseURL+"/api/v1/listtaskbystatus/"+status;
            let result=await axios.get(URL,userAuth);
            store.dispatch(HideLoader());
           if(result.status===200){
             if(status==="Completed"){
                store.dispatch(setCompletedTask(result.data['data']))
            }
            else if(status==="Canceled"){
                store.dispatch(setCanceledTask(result.data['data']))
            }
            else if(status==="Progress"){
                
                store.dispatch(setProgressTask(result.data['data']))
            }
           }else{
                ErrorToast("Something Went Wrong");
           }
        }catch (e) {
           
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader());
            
        }
}
export async function ListByStatus(status){
    store.dispatch(ShowLoader());
    try {
            let URL=BaseURL+"/api/v1/listtaskbystatus/"+status;
            let result=await axios.get(URL,userAuth);
            store.dispatch(HideLoader());
            let data=result.data['data'];
            return data
    } catch (e) {
        ErrorToast("Something Went Wrong");
    }
}

export async function TaskCountByStatus(){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/taskcount";
        let result=await axios.get(URL,userAuth);
        store.dispatch(HideLoader());
        if(result.status===200){
            store.dispatch(setSummary(result.data['data']))
        }else{
            ErrorToast("Something went wrong");
        }
    } catch (e) {
        ErrorToast("Something went wrong");
    }finally{
        store.dispatch(HideLoader());
    }
}

export async function DeleteTask(id){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/deletetask/"+id;
        let result=await axios.post(URL,userAuth);
        store.dispatch(HideLoader());
        if(result.status===200){
            SuccessToast("Task delete Successful");
            return true;
        }else{
            ErrorToast("Something went wrong");
            return false;
        }
    } catch (e) {
        ErrorToast("Something went wrong");
    }finally{
        store.dispatch(HideLoader());
    }
}


export async function DeleteRequest(id,status){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/updatetask/"+id+"/"+status;
        let result=await axios.post(URL,userAuth);
        store.dispatch(HideLoader());
        if(result.status===200){
            SuccessToast("Task update successful");
            return true;
        }else{
            ErrorToast("Something went wrong");
            return false;
        }
    }catch (e) {
        ErrorToast("Something went wrong");
    }finally {
        store.dispatch(HideLoader());
    }

}

export async function LogoutRequest(){
    store.dispatch(ShowLoader());
   try {
       let URL=BaseURL+"/api/v1/logout";
       let result=await axios.get(URL,userAuth);
       store.dispatch(HideLoader());
       if(result.data['status']==="success"){
           return true;
       }
   }catch (e) {
      ErrorToast("Something went wrong");
   }finally {
       store.dispatch(HideLoader());
   }
}

export async function ProfileDetailsRequest(){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/details";
        let result=await axios.get(URL,userAuth);
        store.dispatch(HideLoader());
        if(result.status===200){
            store.dispatch(setProfile(result.data['data'][0]));
        }else{
            ErrorToast("Something went wrong1")
        }
    } catch (e) {
        console.log(e);
        ErrorToast("Something went wrong2");
    }finally{
        store.dispatch(HideLoader());
    }
}


export async function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/update";
        let postBody={
            email:email,
            firstName:firstName,
            lastName:lastName,
            mobile:mobile,
            password:password,
            photo:photo
        };
        let userDetails={
            email:email,
            firstName:firstName,
            lastName:lastName,
            mobile:mobile,
            photo:photo
        }

        store.dispatch(HideLoader());
        let result=await axios.post(URL,postBody,userAuth);
        if(result.status===200){
            SuccessToast("Profile update successful");
            setUserDetails(userDetails);
            return true;
        }else{
            ErrorToast("Something went wrong1");
            return false
        }
    }  catch (e) {
        console.log(e);
        ErrorToast("Something went wrong2");
        return false
    }finally{
        store.dispatch(HideLoader());
    }
}


export async function VerifyEmailRequest(email){
    store.dispatch(ShowLoader()) //dispatch from redux store for show loader when api calling

    try {
        let URL=BaseURL+"/api/v1/verifyemail/"+email; // using backend route path for calling api

        let result=await axios.get(URL); //use axios for receive data from backend;
        if(result.status===200){    //if result status is equal to 200 mean that it is success for receive data from backend
            store.dispatch(HideLoader());
            if(result.data['status']==="fail"){ // if result data status is equal to fail that mean that user not found in this email so return false
                ErrorToast("No user found");
                return false
            }else{//if result data status is equal to success that mean user found in this email.
                setEmail(email);//if found user then the email set in the session storage for future work
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;//if result is success then return true
            }
        }else{
            ErrorToast("Something went wrong1");
            return false
        }

    } catch (e) {
        ErrorToast("Something went wrong2");//if any error than show this error message
        return false
    }finally{
        store.dispatch(HideLoader()); //dispatch from redux store for hide loader when api calling end and all data receive from backend

    }
}

export async function VerifyOTPRequest(email,otp){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/verifyotp/"+email+"/"+otp;
        let result=await axios.get(URL);
        if(result.status===200){
            if(result.data['status']==="fail"){
                ErrorToast("Invalid OTP");
                return false;
            }else{
                setOTP(otp);
                SuccessToast("Code verification successful");
                return true;
            }
        }else{
            ErrorToast("Something went wrong2");
            return false
        }
    } catch (e) {
        ErrorToast("Something went wrong2");
        return false
    }finally{
        store.dispatch(HideLoader())
    }

}

export async function ResetNewPass(email,otp,password){
    store.dispatch(ShowLoader());
    try {
        let URL=BaseURL+"/api/v1/resetpassword";
        let postBody={
            email:email,
            otp:otp,
            password:password
        };
        let result=await axios.post(URL,postBody);
        store.dispatch(HideLoader());
        if(result.status===200){
            if(result.data['status']==="fail"){
                ErrorToast(result.data['data']);
                return true;
            }else{
                SuccessToast("New password created");
                return true;
            }
        }else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    } catch (e) {
        ErrorToast("Something went wrong2");
        return false;
    }finally{
        store.dispatch(HideLoader())
    }
}



