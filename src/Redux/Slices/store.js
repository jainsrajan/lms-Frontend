import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from '../Slices/authslice'
import courseSliceReducer from '../Slices/Courseslice'
import lectureSliceReducer from '../Slices/Lectureslice'

const store = configureStore({
    
    reducer:{
     auth:authSliceReducer,
     course:courseSliceReducer,
     lecture:lectureSliceReducer
    },
    devTools:process.env.NODE_ENV!=='production'
})


export default store