import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteCourseLectures, getCourseLectures } from "../../Redux/Slices/Lectureslice"
import Footer from "../../Components/Footer"

function DisplayLectures()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {state} = useLocation()
    // console.log("The display lecture state is" , state._id)
    const {lectures} = useSelector((state)=>state.lecture)
    // console.log("The display lecture state is" , lectures._id)
    console.log("The lectures are as follows...",lectures)
    const {role} = useSelector((state)=>state.auth)
    const[currentVideo , setVideo] = useState(0)


    useEffect(()=>{
        console.log("The state is ",state)
        if(!state)
        {
            navigate('/courses')
        }

        dispatch(getCourseLectures(state._id));
    
    },[])

   async  function onLectureDelete(courseid , lectureid)

    {
         console.log("The ids are" , courseid , lectureid);

        await dispatch(deleteCourseLectures({courseId:courseid , lectureId:lectureid}))
        await dispatch(getCourseLectures(state._id))


    }


    return (
        <HomeLayout>

<div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white
 mx-10">

    <div className="text-center text-2xl font-semibold text-yellow-500 ">
        Course Name: {state?.title}
    </div>

    <div className="flex justify-center gap-10 w-fill  xs:flex-col ">

        {/* left-section.............. */}
<div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]"> 

<video 
src={lectures && lectures[currentVideo]?.lecture?.secure_url}
className="object-fill rounded-tl-lg rounded-tr-lg w-full xs:ml-16"
controls
disablePictureInPicture
muted
controlsList="nodownload"

></video>

<div className ="xs:text-center">
    <h1>
        <span>
            {lectures && lectures[currentVideo]?.title}
        </span>
    </h1>

    <p>
        <span className = "text-yellow-500 line-clamp-4">
            Description: {" "}

        </span>

        {lectures && lectures[currentVideo]?.description}

    </p>
</div>
</div>

{/* Right Section */}

<ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 xs:text-start ml-16">
    <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">

        <p>Lectures list</p>
        
        {role === "ADMIN" && (
            <button onClick={() => navigate("/course/newlecture" , {state:{...state}})} className="btn-secondary px-2 py-1 rounded-md font-semibold text-sm">
                Add new lecture
            </button>
        )}
    </li>

    {
        lectures && lectures.map((lecture , idx)=>{
            // console.log("The idx is" , idx)
            return(
                <li className="space-y-2" key = {lecture._id}>
                   
                   <p className="cursor-pointer" onClick={()=>setVideo(idx)}>
                   
                   <span>
                    {" "}  Lecture{idx+1} : {" "}
                   </span>
                   {lecture?.title}
                   </p>

                   {role==='ADMIN' &&(
            <button onClick={()=>onLectureDelete(state._id , lecture._id)} className="w-1/2 bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center'>
            ">
                Delete lecture
            </button>
        )}

                </li>
            )
        })
    }
</ul>

    </div>

</div>
<Footer/>
        </HomeLayout>


    )

}
export default DisplayLectures
