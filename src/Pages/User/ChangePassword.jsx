import { useState } from "react"
// import Footer from "../Components/Footer"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'

import HomeLayout from "../../Layouts/HomeLayout"
import { changepassword } from "../../Redux/Slices/authslice"

function ChangePassword()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const[previewImage , setPrevImage] = useState("")

    const [changePassword , setchangePassword] = useState({

   oldpassword:"",
   newpassword:"",
    
    })

    function handleUserInput(e)
    {
       
        const{name , value} = e.target
        setchangePassword({
            ...changePassword,
            [name]:value
        })
        e.preventDefault()
        // console.log("name*****" , name)
    }

    async function OnSubmit(event)
    {
console.log("srajan")
        event.preventDefault()

        if(!changePassword.oldpassword || !changePassword.newpassword)

        {
            toast.error("Please fill all the details")
            return;
        }

    //dispatch login account action......

  const response = await dispatch(changepassword(changePassword))
  console.log("The response is.....",response)

  if(response?.payload?.success)
  {
    navigate("/")
  }

  setchangePassword({

    oldpassword:"",
    newpassword:"",

   })

}
    return (

<HomeLayout>

<div className ="flex items-center justify-center h-[100vh]" >

    <form noValidate onSubmit={OnSubmit} className = "flex flex-col gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">

<h1 className = "text-center text-2xl font-bold">Login Page</h1>


 {/* Old password................. */}
 <div className="flex flex-col gap-1">

    <label htmlFor="oldpassword" className="font-semibold">Old Password</label>

    <input 

    type="password" 
    required
    name='oldpassword'
    id="oldpassword"
    placeholder="Enter your old password..."
    className="bg-transparent px-2  border"
    onChange={handleUserInput}
    value={changePassword.oldpassword}
    />

 </div>


{/*New  Passowrd........... */}
 <div className="flex flex-col gap-1">

    <label htmlFor="newpassword" className="font-semibold">New Password</label>

    <input

    type="password" 
    required
    name='newpassword'
    id="newpassword"
    placeholder="Enter your new password..."
    className="bg-transparent px-2  border"
    onChange={handleUserInput}
    value={changePassword.newpassword}/>

 </div>

 <button type="submit" className="font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 cursor-pointer  text-lg mt-4">Change Password</button>

 
    </form>
</div>


{/* <Footer/> */}
</HomeLayout>

    )
}

export default ChangePassword