import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    color : '#042743',
    backgroundColor : 'white'
    // mode: 'dark',
    // color : 'white',
    // backgroundColor : '#042743'
}

const themeSlice = createSlice({
    name : 'theme', 
    initialState, 
    reducers: {
        setLightTheme(state, action){
            state.mode = 'light';
            // state.backgroundColor = 'white';
            // state.color = '#042743';
            // document.body.style.backgroundColor = state.backgroundColor;
            
            // new
            state.color = '#686263';
            state.backgroundColor = '#13343b';
        },
        setDarkTheme(state, action){
            state.mode = 'dark';
            // state.backgroundColor = '#042743';
            // state.color = 'white';
            // document.body.style.backgroundColor = state.backgroundColor;
        }
    }
})

export const {setLightTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;