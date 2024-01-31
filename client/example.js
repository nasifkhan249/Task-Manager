export async function TaskListByStatus(status){
    try {
            let URL=BaseURL+"/api/v1/listtaskbystatus/"+status;
            let result=await axios.get(URL,userAuth);

            let data=result.data['data'];
            return data
    } catch (e) {
        ErrorToast("Something Went Wrong");
    }
}