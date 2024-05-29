import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState ={

    allUsersCount :0,
    subscribedCount : 0
}

export const getStatsData = createAsyncThunk("stats/get" , async()=>{
    try {
        const response = axiosInstance.get("admin/stats/users")
        toast.promise(response , {
            loading:"Getting the stats",
            success:(data)=>{
                return data?.data?.messsage
            },

            error: ("Filed to load the data stats")
        })

        // console.log("the admin-Dashboard data is" , (await response).data)
         return (await response).data
         
    } catch (error) {
        return (error?.response?.data?.message)
    }
})

const statSlice = createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStatsData.fulfilled,(state ,action)=>{
            
            state.allUsersCount = action?.payload?.allUsersCount
            state.subscribedCount = action?.payload?.subscribedCount
        })

    }
})

export default  statSlice.reducer