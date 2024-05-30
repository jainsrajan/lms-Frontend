import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData:[]
}

export const getAllcourses = createAsyncThunk("/courses/get" , async()=>{

            try {

                const response = axiosInstance.get("lms-backend-gules.vercel.app/courses")
                toast.promise(response , {
                    loading:"Loading course data...",
                    success:"Courses loaded successfully",
                    error:"Failed to get the courses"
                })
                console.log(response)
                  return (await response).data.courses

            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
})


export const deleteCourse = createAsyncThunk("/courses/get" , async(id)=>{

    try {

        const response = axiosInstance.delete(`/courses/${id}`)
        toast.promise(response , {
            loading:"Deleting course...",
            success:"Courses deleted successfully",
            error:"Failed to delete the courses"
        })
        console.log(response)
          return (await response).data.courses

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})





export const createNewCourse = createAsyncThunk('/course/create' , async(data)=>{

    try {
 
        let formData = new FormData()
        formData.append("title" , data?.title)
        formData.append("description" , data?.description)
        formData.append("category" , data?.category)
        formData.append("createdBy" , data?.createdBy)
        formData.append("thumbnail" , data?.thumbnail)

        const response = axiosInstance.post("/courses" ,formData )
        toast.promise(response,{
            loading:"Creating new course",
            success:"Course created Successfully",
            error:"Failed to create the course"
        })
               console.log("response data is" , await(response).data)
        return  (await response).data
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({

    name: "courses",
    initialState,
    reducers:{},
    
    extraReducers:(builder)=>{
        builder
        .addCase(getAllcourses.fulfilled, (state , action)=>{
            console.log("The action proprety is ", action)
            if(action.payload)
            {
              
                state.courseData = [...action.payload]
                console.log("The action.payload value is" , state.courseData)
            }
        })

    }
})

export default courseSlice.reducer
