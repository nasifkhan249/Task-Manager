import axios from 'axios';
import {ErrorToast, SuccessToast} from "../helpers/FormHelper";
import store from '../redux/store/store';
import { HideLoader, ShowLoader } from '../redux/state-slice/settings-slice';
import getTokenFromCookie from "../helpers/unauthorized.js";
import { setToken, setUserDetails} from "../helpers/SessionHelper.js";
import { setCanceledTask, setCompletedTask, setProgressTask } from '../redux/state-slice/task-slice.js';
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
                    ErrorToast("Something went wrong");
                    return false
                }
    }catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something went wrong");
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











