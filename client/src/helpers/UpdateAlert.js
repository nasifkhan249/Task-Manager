import Swal from "sweetalert2";
import {DeleteRequest} from "../APIRequest/APIRequest.js";


export function UpdateTODO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {New: 'New', Completed: 'Completed', Progress: 'Progress', Canceled: 'Canceled'},
        inputValue:status,
    }).then((result)=>{
       return  DeleteRequest(id,result.value).then((result)=>{
            return result
        })

    })
}