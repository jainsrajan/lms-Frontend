import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { addCourseLectures } from "../../Redux/Slices/Lectureslice"
import { AiOutlineArrowLeft } from "react-icons/ai"

function Addlectures()
{

    const courseDetails = useLocation().state
    console.log("The add lecture is " , courseDetails);  

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[userInput , setUserInput] = useState({

        id:courseDetails._id,
        title:" ",
        description:" ",
        lecture: undefined,
        videosrc:" " 
       })

       function handleInputChange(e)
       {
        const{name , value} = e.target
        setUserInput({
            ...userInput,
            [name]:value
        })
       }

       function handlevideo(e)
       {
const video = e.target.files[0]
const source = window.URL.createObjectURL(video)
console.log(source)
console.log("The video is" , video)

setUserInput({
    ...userInput,
    lecture:video,
    videoSrc: source
})
       }

async function onFormSubmit(e)
{
    // console.log("srajan")
    e.preventdefault()
    if(!userInput.lecture || !userInput.title || !userInput.description )
        {
            toast.error("All fields are mandatory")
            return
        }

        const response = await dispatch(addCourseLectures(userInput))
        console.log("The response payload data is",response?.payload)

if(response?.payload?.success)
    {
        setUserInput({
            id:courseDetails._id,
            title:" ",
            description:" ",
            lecture: undefined,
            videosrc:" " 
        })
    }
}
       

       useEffect(()=>{
        if(!courseDetails)
            (
        navigate('/courses'))
       },[])

    return(
        <HomeLayout>

<div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 m-16">

<div className="flex flex-col gap-5 shadow-[0_0_10px_black] w-96 rounded">
    <header className="flex items-center justify-center relative">


        <button className=" absolute left-2 text-xl text-green-500"
        onClick={()=> navigate(-1)}
                 >

<AiOutlineArrowLeft/>
        </button>


        <h1 className="text-xl text-yellow-500 font-semibold">
            Add new lecture
        </h1>
    </header>

    <form onSubmit =  {onFormSubmit} className="flex flex-col gap-3">

        <input 
        type="text"
        name="title"
        placeholder="Enter the title"
        onChange={handleInputChange}
        className = "bg-transparent px-3 py-1 border"
        value={userInput.title} />

<textarea 
        type="text"
        name="description"
        placeholder="Enter the description of the lecture"
        onChange={handleInputChange}
        className = "bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24"
        value={userInput.description} />

     

    </form>
</div>

</div>
        </HomeLayout>
    )
   
}

export default Addlectures