import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={

    key :"",
    subscription_id:"",
    isPaymentVerified : "",
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
}


export const getRazorpayId = cerateAsyncThunk("/razorpay/getId" , async()=>{

    try
    {
        const response = await axiosInstance.get("/payments/razorpay-key")


         return response.data

    }

    catch(error)
    {
       toast.error("Failed to load the data")
    }
})


export const purchaseCourseBundle = cerateAsyncThunk("/purchaceCourse" , async()=>{

    try
    {
        const response = await axiosInstance.get("/payments/subscribe")


         return response.data

    }

    catch(error)
    {
       toast.error(error?.response?.data?.message)
    }
})


export const verifyUserPayment = cerateAsyncThunk("/payments/verify" , async(data)=>{

    try
    {
        const response = await axiosInstance.get("/payments/verify" , {
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


export const getPaymentRecord = cerateAsyncThunk("/payments/record" , async()=>{

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


export const cancelCourseBundle = cerateAsyncThunk("/payments/cancel" , async()=>{

    try
    {
        const response = await axiosInstance.get("/payments/unsubscribe")
            
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
            state.key = action?.payload?.key
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