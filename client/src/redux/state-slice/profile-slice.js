import { createSlice } from '@reduxjs/toolkit';

export const profileSlice=createSlice({
    name:"profile",
    initialState:{
        value:[]
    },
    reducers:{
        setProfile:(state,action)=>{
            return {
                ...state,
                value:action.payload
            }
        }
    }
});

export const {setProfile}=profileSlice.actions;
export default profileSlice.reducer;
