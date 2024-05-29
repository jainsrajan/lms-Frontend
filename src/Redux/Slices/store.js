import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from '../Slices/authslice'
import courseSliceReducer from '../Slices/Courseslice'
import lectureSliceReducer from '../Slices/Lectureslice'
import razorpaySliceReducer from '../Slices/Paymentslice'
import statSliceReducer from '../Slices/StatSlice'


const store = configureStore({
    
    reducer:{
     auth:authSliceReducer,
     course:courseSliceReducer,
     lecture:lectureSliceReducer,
     razorpay:razorpaySliceReducer,
     stat:statSliceReducer
    },

    devTools:process.env.NODE_ENV!=='production'
})


export default store