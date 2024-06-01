import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={

    key: '',
    subscription_id:"",
    isPaymentVerified : false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
}

export const getRazorpayId = createAsyncThunk("/razorpay/getId" , async()=>{

    try
    {
        const response =  await axiosInstance.get("https://lms-backend-lty4.onrender.com/api/v1/payments/razorpay-key")
        //  console.log("The getrazorpayAPI data is----- ",response.data)
         return  response.data
    }

    catch(error)
    {
       toast.error("Failed to load the data")
    }
})


export const purchaseCourseBundle = createAsyncThunk("/purchaceCourse" , async()=>{

    try
    {
        const response = await axiosInstance.post("https://lms-backend-lty4.onrender.com/api/v1/payments/subscribe")
        // console.log("The response data of subscription is+++" ,response)
         return response.data
    }
    catch(error)
    {
       toast.error(error?.response?.data?.message)
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify" , async(data)=>{

    try
    {
        const response = await axiosInstance.post("https://lms-backend-lty4.onrender.com/api/v1/payments/verify" , {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })

         return response.data
    }

    catch(error)
    {
       toast.error("Failed to load the data")
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record" , async()=>{

    try
    {
        const response = axiosInstance.get("/payments?count=100")
            
            toast.promise(response, {
                loading:"Getting the payment record",
                success:(data)=>{
                    return data?.data?.message
                },
                error:"Failed to get payment record"
            })
         return (await response).data
    }

    catch(error)
    {
       toast.error("Operation Failed")
    }
})


export const cancelCourseBundle = createAsyncThunk("/payments/cancel" , async()=>{

    try
    {
        const response =  axiosInstance.post("https://lms-backend-lty4.onrender.com/api/v1/payments/unsubscribe")
            console.log("the unsubscribe response is" , response)
            toast.promise(response, {
                loading:"Unsubscribing the bundle",
                success:(data)=>{
                    return data?.data?.message
                },
        
                error:"Failed to unsubscribe"
            })
        
         return (await response).data
    }

    catch(error)
    {
       toast.error(error?.response?.data?.message)
    }
})


const razorpaySlice = createSlice({

    name:"razorpay",
    initialState,
    reducers:{},

    extraReducers:(builder)=> {

        builder
        .addCase(getRazorpayId.fulfilled , (state , action)=>{
            // console.log("The action payload key is ",action?.payload?.message)
            state.key = action?.payload?.message
            
        })

          .addCase(purchaseCourseBundle.fulfilled , (state , action)=>{
            state.subscription_id = action?.payload?.subscription_id
          })

          .addCase(verifyUserPayment.fulfilled,(state , action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
          })

          .addCase(verifyUserPayment.rejected,(state , action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
          })

          .addCase(getPaymentRecord.fulfilled,(state , action)=>{
           state.allPayments = action?.payload?.allPayments
           state.finalMonths = action?.payload?.finalMonths
           state.monthlySalesRecord = action?.payload?.monthlySalesRecord
          })
    }

})

export default razorpaySlice.reducer
