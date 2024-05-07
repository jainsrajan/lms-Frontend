import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { getUserData, updateprofile } from "../../Redux/Slices/authslice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai";

function Editprofile()

{

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const[data , setdata] = useState({
        previewImage:"",
        fullName:"",
        avatar:" ",
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleImageupload(e)
    {
        e.preventDefault();
    const uploadedimage = e.target.files[0];

    if(uploadedimage)
    {
        const filereader = new FileReader();
        filereader.readAsDataURL(uploadedimage);
        filereader.addEventListener('load' , function()

        {
            setdata({
                ...data,
                previewImage:this.result,
                avatar:uploadedimage
            })
        } )
    }
    
    }

    function handleInputChange(e)
    {
        const{name , value} = e.target;
         
        setdata({
            ...data,
            [name]:value
        })
    }

    
    // console.log("The data is ",data);

    async function onFormSubmit(e)
    {
        e.preventDefault()

        if(!data.fullName || !data.avatar)
        {
            toast.error("All fields are required");
            return
        }

        // if(!data.fullName.length()<5)
        // {
        //     toast.error("Name cannot be less then 5 character");
        //     return
        // }

        const formData = new FormData()
        formData.append("fullName" , data.fullName)
        formData.append("avatar" , data.avatar)

        await dispatch(updateprofile([data.userId , formData]))

        await dispatch(getUserData());
    
        navigate('/user/profile');
    }
    
    return(
           
<HomeLayout>
          
<div className ="flex items-center justify-center h-[100vh]" >
                           
    <form noValidate onSubmit={onFormSubmit} className = "flex flex-col gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">

<h1 className = "text-center text-2xl font-bold">Edit Profile</h1>

<label htmlFor="image_uploads" className="cursor-pointer">

{data.previewImage ?(
    <img  alt="" className="w-24 h-24 rounded-full m-auto" 
    src={data.previewImage}/>
) :
(
    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
)
}

</label>

<input className="hidden"
onChange={handleImageupload}
type = "file"
id = 'image_uploads'
name="image_uploads"
accept=".jpg , .jpeg , .png , svg"
 />


{/* Full name of a user............ */}

<div className="flex flex-col gap-1">

<label htmlFor="fullName" className="font-semibold">Full Name</label>

<input 

type="text" 
required
name='fullName'
value={data.fullName}
id="fullName"
placeholder="Enter your full name..."
className="bg-transparent px-2  border"
onChange={handleInputChange}

/>

</div>

<button type="submit" className=" w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg">
Update Profile
</button>

<Link to="/user/profile">

<p className="link text-accent cursor-pointer flex items-center justify-center w-full" >
<AiOutlineArrowLeft/>    Go back to profile
</p>

</Link>


    </form>
</div>

</HomeLayout>

    )
}

export default Editprofile
