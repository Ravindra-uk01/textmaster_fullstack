import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     type : '',
     message : '',
     show : false
}

const alertSlice = createSlice({
    name : "alert",
    initialState,
    reducers :{
        setAlert(state, action){
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.show = true;
        },
        removeAlert(state, action){
            state.type = '';
            state.message = '';
            state.show = false;
        }
    }
})

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;