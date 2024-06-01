import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures:[]
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get' , async(cid)=>{

    try {
        
        const response = axiosInstance.get(`https://lms-backend-lty4.onrender.com/api/v1/courses/${cid}`)
        toast.promise(response , {
            loading:"Fetching course lectures",
            success:"Lecture fetched successfully",
            error:"Failed to load lecture"
        })
        // console.log("The getcourselecture is" , (await response).data)
        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }

})

export const addCourseLectures = createAsyncThunk('/course/lecture/add' , async(data)=>{

    try {
        console.log("The add lecture slice data is"  , data)
        const formdata = new FormData()

        formdata.append("title" , data.title);
        formdata.append("description" , data.description) 
        formdata.append("lecture" , data.lecture)

        console.log("The formdata is ",formdata)
        
        const response = axiosInstance.post(`https://lms-backend-lty4.onrender.com/api/v1/courses/${data.id}` , formdata)
        toast.promise(response , {
            loading:"Adding course lectures",
            success:"Lectures added successfully",
            error:"Failed to load lecture"
        })

        console.log("The response of the add lecture data is" , (await response).data)

        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }

})

export const deleteCourseLectures = createAsyncThunk('/course/lecture/delete' , async(data)=>{

    try {
        
        const response = axiosInstance.delete(`https://lms-backend-lty4.onrender.com/api/v1/courses/${data.courseId}/${data.lectureId}`)

        toast.promise(response , {
            loading:"Deleting course lectures",
            success:"Lecture deleted successfully",
            error:"Failed to delete the lecture"
        })
        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }

})


const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(getCourseLectures.fulfilled , (state , action)=>{
            state.lectures =  action?.payload?.lectures
        })

        .addCase(addCourseLectures.fulfilled , (state , action)=>{
            state.lectures = action?.payload?.course?.lectures
        })
    }

})

export default lectureSlice.reducer
