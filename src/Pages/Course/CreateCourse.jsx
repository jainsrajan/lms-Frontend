import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createNewCourse } from "../../Redux/Slices/Courseslice"
import HomeLayout from "../../Layouts/HomeLayout"
import { AiOutlineArrowLeft } from "react-icons/ai"

function CreateCourse()
{

const dispatch = useDispatch()
const navigate = useNavigate()

const[userInput , setUserInput] = useState({
    title:"",
    category:"",
    createdBy:"",
    description:"",
    thumbnail:null,
    previewImage:""

})

function handleImageUpload(e)
{
    e.preventDefault()

    const uploadImage = e.target.files[0];
    console.log("uploadimage" , uploadImage)
    if(uploadImage)
    {
        const filereader = new FileReader()
        filereader.readAsDataURL(uploadImage)
        filereader.addEventListener("load" , function()
        {
            setUserInput({
                ...userInput,
                previewImage:this.result,
                thumbnail:uploadImage
            })
    

        })
     
    }

}

function handleUserInput(e)
{
    const{name , value} = e.target
    setUserInput({
        ...userInput,
        [name]:value
    })

}

async function onFormSubmit(e)
{
    e.preventDefault()

    if(!userInput.title || !userInput.category || !userInput.description || !userInput.thumbnail || !userInput.previewImage)
    {
toast.error("All fields are mandatory")
return;
    }

    const response = await dispatch(createNewCourse(userInput))
    console.log("Response is" , response)

    if(response?.payload?.success)
    {
        navigate('/courses')
    }
    
}


return (

<HomeLayout>

<div className="flex items-center justify-center h-[100vh]">

<form
noValidate
onSubmit={onFormSubmit}
className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] shadow-[0_0_10px_black] relative">


<Link className="absolute top-8 text-2xl link text-accent cursor-pointer">

<AiOutlineArrowLeft/>

</Link>

<h1 className="text-center text-2xl font-bold">
    Create New Course
</h1>

<main className="grid grid-cols-2 gap-x-12">

{/* Coloumn-1....................... */}

    <div className="gap-y-10">

        <div>
            
            <label htmlFor="image_uploads" className="cursor-pointer">
                {userInput.previewImage ? (
                    <img 
                    className="w-full h-44 m-auto border"
                    src={userInput.previewImage} />
                ): 
                
                (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">

                        <h1 className="font-bold text-lg">Upload your course thumbnail
                        </h1>
                        
                        </div>
             )}

    </label>

            <input
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg , .png , .jpeg"
            name="image_uploads"
            onChange={handleImageUpload}
            
            />
        
        </div> 
        {/* End */}

        <div className="flex flex-col gap-1">

            <label htmlFor="title" className="text-lg font-semibold">Course Title
            
            </label>
            <input 
required
type="text"
name="title"
id="title"
placeholder="Enter the title...."
className="bg-transparent px-2 py-1 border"
value={userInput.title}
onChange={handleUserInput}

 />

        </div>
        {/* End-2 */}

    </div>

{/* Coloumn-2....................... */}

<div className="flex flex-col gap-1">

<div className="flex flex-col gap-1">

            <label htmlFor="createdBy" className="text-lg font-semibold">
                Course Instructor
            
            </label>

<input 

required
type="text"
name="createdBy"
id="createdBy"
placeholder="Enter the name of the course Instructor...."
className="bg-transparent px-2 py-1 border"
value={userInput.createdBy}
onChange={handleUserInput}

 />

</div>

        <div className="flex flex-col gap-1">

            <label htmlFor="description" className="text-lg font-semibold">Course Description
            
            </label>

            <textarea

required
type="text"
name="description"
id='description'
placeholder="Enter the description...."
className="bg-transparent px-2 py-1 overflow-y-scroll border"
value={userInput.description}
onChange={handleUserInput}

 />

</div>

<div className="flex flex-col gap-1">

<label htmlFor="category" className="text-lg font-semibold">Course Category

</label>

<textarea

required
type="text"
name="category"
id='category'
placeholder="Enter the course category...."
className="bg-transparent px-2 py-1 border"
value={userInput.category}
onChange={handleUserInput}

/>

</div>

</div>

</main>

<button type="submit" className=" w-full py-2 font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all eas-in-out duration-300 rounded-sm">

    Create Course
</button>

</form>
</div>

</HomeLayout>

)

}
export default CreateCourse