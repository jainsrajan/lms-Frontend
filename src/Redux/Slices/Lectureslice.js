import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures:[]
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get' , async(cid)=>{

    try {
        
        const response = axiosInstance.get(`/courses/${cid}`)
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
        const formdata = new FormData()

        formdata.append("title" , data.title);
        formdata.append("description" , data.description) 
        formdata.append("lecture" , data.lecture)
        
        const response = axiosInstance.post(`/courses/${data.id}` , formdata)
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
        
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)

        toast.promise(response , {
            loading:"Fetching course lectures",
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