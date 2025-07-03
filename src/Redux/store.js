import {configureStore} from '@reduxjs/toolkit';
import pasteReducer from './pasteSlice.jsx';

export const store=configureStore({
    reducer:{
        paste: pasteReducer
    }
});