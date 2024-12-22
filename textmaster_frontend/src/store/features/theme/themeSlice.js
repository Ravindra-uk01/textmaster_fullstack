import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: localStorage.getItem('theme') || 'light',
}

const themeSlice = createSlice({
    name : 'theme', 
    initialState, 
    reducers: {
        setTheme(state, action) {
            state.mode = action.payload; // Set mode based on payload
            localStorage.setItem('theme', action.payload); // Save to localStorage
        },
        // setLightTheme(state, action){
        //     state.mode = 'light';
        //     localStorage.setItem('theme', "light");
        // },
        // setDarkTheme(state, action){
        //     state.mode = 'dark';
        //     localStorage.setItem('theme', "dark");
        // }
    }
})

export const {setTheme } = themeSlice.actions;
export default themeSlice.reducer;