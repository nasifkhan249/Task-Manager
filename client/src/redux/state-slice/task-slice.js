import { createSlice } from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name:"task",
    initialState:{
        New:[],
        Completed:[],
        Progress:[],
        Canceled:[]
    },
    
    reducers:{
        setNewTask:(state,action)=>{
            return{
                ...state,
                New:action.payload
                
            }
            
        },
        setCompletedTask:(state,action)=>{
            return{
                ...state,
                Completed:action.payload
            }
        },
        setProgressTask:(state,action)=>{
            return{
                ...state,
                Progress:action.payload
            }
        },
        setCanceledTask:(state,action)=>{
            return{
                ...state,
                Canceled:action.payload
            }
        }
    }
})
export const {setNewTask,setCompletedTask,setProgressTask,setCanceledTask}=taskSlice.actions;
export default taskSlice.reducer;