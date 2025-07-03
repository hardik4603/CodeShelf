import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
}

const pasteSlice = createSlice({
    name: "paste",
    initialState,
    reducers:{
        addToPastes: (state,action)=>{
            const paste=action.payload;

            state.pastes.push(paste);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            
            toast.success("Snippet Added");
        },

        updatePastes: (state, action)=>{
            const paste=action.payload;
            const index=state.pastes.findIndex((item)=>item._id==paste._id);
            state.pastes[index]=paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Code Updated");
        },

        removeFromPastes: (state,action)=>{
            state.pastes.splice(action.payload,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
        },

        resetPastes: (state, action)=>{

        },


    }
})

export const {addToPastes, updatePastes, removeFromPastes, resetPastes} = pasteSlice.actions;
export default pasteSlice.reducer;