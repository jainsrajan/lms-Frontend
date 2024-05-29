import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout.jsx"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addCourseLectures } from "../../Redux/Slices/Lectureslice"
import { AiOutlineArrowLeft } from "react-icons/ai"
import toast from "react-hot-toast"
import { getAllcourses } from "../../Redux/Slices/Courseslice.js"


function Addlectures()
{

    const courseDetails = useLocation().state
    const dispatch = useDispatch()

const navigate = useNavigate()

const[userInput  , setUserInput] = useState({
    id:courseDetails?._id,
    lecture:undefined,
    title:"",
    description:"",
    videoSrc:""
}) 

function handleInputChange(e)
{
    const{name , value} = e.target

    setUserInput({
        ...userInput,
        [name]:value
    })
}

function handleVideo(e)
{

    const video = e.target.files[0]
    const source = window.URL.createObjectURL(video)
    console.log(source)
    setUserInput({
        ...userInput,
        lecture:video,
        videoSrc:source
    }) 

}

async function onFormSubmit(e)
{
    // console.log('srajan jain')
     e.preventDefault()
     if(!userInput.lecture || !userInput.title || !userInput.description)

        {
            toast.error("All fields are mandatory")
            return
        }
const  response = await dispatch(addCourseLectures(userInput));
console.log("The response of add lecture is" , response)

if(response?.payload?.success)
    {setUserInput({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    })

    }

}


useEffect(()=>{
    if(!courseDetails)
        {
            navigate('/courses')
        }

} , [])

   return(
    <HomeLayout> 
        <div className="min-h-screen text-white flex flex-col items-center justify-center gap-10 mx-16">

<div className="flex flex-col gap-5 pp-2 shadow-[0_0_10px_black] w-96 rounded-lg  ">
<header className="flex items-center justify-center relative">
    <button className="absolute left-2 text-green-500"
    onClick={()=>navigate(-1)}
    >
    <AiOutlineArrowLeft/>
    </button>
    <h1 className="text-xl text-yellow-500 font-semibold">
    Add new lecture
    
    </h1>
    </header>

<form 
onSubmit={onFormSubmit} className="flex flex-col gap-3 ">

<input type="text" 
 name="title"
 placeholder="Enter the title of the lecture"
 onChange={handleInputChange}
 className="bg-transparent px-3 py-2 border"
 value={userInput.title}

/>

<textarea type="text" 
 name="description"
 placeholder="Enter the description of the lecture"
 onChange={handleInputChange}
 className="bg-transparent px-3 py-2 border resize-none overflow-y-scroll h-75"
 value={userInput.description}

/>

{userInput.videoSrc ? (
          
     <video
     muted
     src={userInput.videoSrc}
     controls
     controlsList="nodownload nofullscreen"
     disablePictureInPicture
     className="object-fill rounded-tl-lg rounded-tr-lg w-full">

     </video>

):

(
      <div className=" h-48 border flex items-center justify-center cursor-pointer">
        <label className="font-semibold text-xl cursor-pointer"
               htmlFor="lecture">Choose your video</label>
        <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*"/>
      </div>

)}

<button type="submit" className="btn btn-primary py-1 font-semibold text-lg ">
Add new lecture
</button>

</form>
</div>


        </div>
    </HomeLayout>
   )

}

export default  Addlectures