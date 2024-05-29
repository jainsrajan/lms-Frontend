import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"
import { useParams } from "react-router-dom";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: JSON.parse(localStorage.getItem('role')) || " ",
    data:localStorage.getItem("data")!==undefined  ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount = createAsyncThunk("/auth/signup" , async(data)=>{
    try {

            const res = axiosInstance.post("user/register" , data)
        
            toast.promise(res , {
                loading:"Wait, creating your account",
                success:(data)=>{
                    return data?.data?.message;
                },
                
                error:"Failed to create account"
            });

          console.log("The res.data value is", (await res))
            return (await res).data
        
    } catch (error) {

        toast.error(error?.response?.data?.message)
        
    }
})


// Login account slic......................


export const loginAccount = createAsyncThunk("/auth/login" , async(data)=>{
    try {

            const res = axiosInstance.post("user/login" , data)
          console.log("first response" , res)
            toast.promise(res , {
                loading:"Wait! authentication is in progress....",
                success:(data)=>{
                    return data?.data?.message;
                },
                
                error:"Failed to login account"
            },
            );


            console.log("The value of res.data in login account is " ,(await res).data)
            // console.log("second response " ,await res)
            return (await res).data
        
    } catch (error) {

        toast.error(error?.response?.data?.message)
    }
})

export const logout = createAsyncThunk("/auth/logout" , async()=>{
    try {

        const res = axiosInstance.get("user/logout")
          
        toast.promise(res , {
            loading:"Wait! logging out is in progress....",
            success:(data)=>{
                return data?.data?.message;
            },
            
            error:"Failed to logout"
        })

        return (await res).data

    } catch (error) {
         toast.error(error?.response?.data?.message)
    }
})

                             
export const updateprofile = createAsyncThunk("/user/update/profile" , async(data)=>{
    try {
        // console.log("id is" , id)

        const res = axiosInstance.put(`user/update/${data[0]}` , data[1])
          
        toast.promise(res , {
            loading:"Wait! profile update is in progress....",
            success:(data)=>{
                return data?.data?.message;
            },

            error:"Failed to update profile"
        })

        console.log("the res.data is in updateprofile is" ,  (await res).data)
        return (await res).data

    } catch (error) {
         toast.error(error?.response?.data?.message)
    }
})


export const changepassword = createAsyncThunk("/user/changepassword" , async(data)=>{
    try {
        console.log("The data is" ,data )

        const res = axiosInstance.post('user/changepassword' , data)
          console.log("The changepassword response is " , res)
        toast.promise(res , {
            loading:"Wait! passowrd is updating.....",
            success:(data)=>{
                return data?.data?.message;
            },

            error:"Failed to update your password"
        })

        // console.log("the res.data is in updateprofile is" ,  (await res).data)
        return (await res).data

    } catch (error) {
         toast.error(error?.response?.data?.message)
    }
})


// Forgot password slice

export const forgotpassword = createAsyncThunk("/user/forgotpassword" , async(data)=>{
    try {
        // console.log("The data is" ,data )

        const res = axiosInstance.post('user/reset' , data)
   
        toast.promise(res , {
            loading:"Wait! Verification email is sending.....",
            success:(data)=>{
                return data?.data?.message;
            },

            error:"Failed to send the email id"
        })

        // console.log("the res.data is in updateprofile is" ,  (await res).data)
        return (await res).data

    } catch (error) {
         toast.error(error?.response?.data?.message)
    }
})


//Reset Password...........

export const resetpassword = createAsyncThunk("/user/resetpassword" , async(data)=>{
    try {
       
        // console.log("The resetpassword data is" , data )
        console.log("The password and token are as follows ",data.userpassword.token , data.userpassword.password)

        const res = axiosInstance.post(`user/reset-password/${data.userpassword.token}` , data.userpassword)
   
        toast.promise(res , {
            loading:"Wait! Reseting your password.....",
            success:(data)=>{
                return data?.data?.message;
            },

             error:"Failed to reset your password"
        })

        // console.log("the res.data is in updateprofile is" ,  (await res).data)
        return (await res).data

    } catch (error) {
         toast.error(error?.response?.data?.message)
    }
})





export const getUserData = createAsyncThunk("/user/details" , async()=>{
    try {

        const res = axiosInstance.get("user/me")

        console.log("getuserdata is " , (await res).data)
        return  (await res).data

    } catch (error) {
         toast.error(error.message)
    }
})


const authslice = createSlice({

    name:'auth',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder

        .addCase(loginAccount.fulfilled, (state , action)=>{
            // console.log("The action is.......", action);
            localStorage.setItem("data" , JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn" , true)
            localStorage.setItem("role" , JSON.stringify(action?.payload?.user?.role))

            if(action?.payload)
                {
                    state.isLoggedIn = true
                    state.data = action?.payload?.user
                    state.role = action?.payload?.user?.role
                }
           
        })
       

        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false
            state.role=""
        })


        .addCase(getUserData.fulfilled, (state , action)=>{
            // console.log("The action is.......", action);
            localStorage.setItem("data" , JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn" , true)
            localStorage.setItem("role" , JSON.stringify(action?.payload?.user?.role))
             
         

    state.isLoggedIn = true
    state.data = action?.payload?.user
    state.role = action?.payload?.user?.role


           
        })
    }
})

// export const {} = authslice.actions
export default authslice.reducer 