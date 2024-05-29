import {useState } from "react";
import {useDispatch} from "react-redux"
import {useNavigate } from "react-router-dom"

import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

import { forgotpassword } from "../../Redux/Slices/authslice";



function Forgotpassword()
{
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
     const [useremail , setemail] = useState({
        email:""
     })
    
    function handleUserInput(e)
    {
       
        const{name , value} = e.target
        setemail({
            ...useremail,
            [name]:value
        })
        e.preventDefault()
        // console.log("name*****" , name)
    }
    
  async function onformsubmit(e)
  {
    e.preventDefault()

    if(!useremail.email)

        {
            toast.error("Please fill the details")
            return;
        }

        await dispatch(forgotpassword(useremail))
   
  setemail({
    email:" "
  })
}
    
    //Creating th UI for the Forgot password page .............
    
    return(
        <HomeLayout>
    
    <form  noValidate onSubmit={onformsubmit}
    className="min-h-screen flex items-center justify-center text-white">
    
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
    
            <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Forgot Password</h1>
    
    <div className="px-4 space-y-5 text-center">
         
    <p className="text-[17px]">
    
       Enter your registered Email id, we will send you a verification link on a regostereed email id form which you can reset your password.{" "}

    </p>
    
    
{/* //Email block.............. */}

<div className="flex flex-col gap-5">
    <div className="flex flex-col">

<label htmlFor="email" className="font-semibold "></label>

<input

type="email" 
required
name='email'
id="email"
placeholder="Enter your registered Email Id"
className="bg-transparent px-2 py-1 border"
onChange={handleUserInput}
value={useremail.email}
/>

</div>


    <button type="submit"  className="font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 px-3 cursor-pointer text-lg mt-4" >
       Get Verification Link
    </button>
    </div>
    </div>
    
        </div>
    
    
    </form>
    
        </HomeLayout>
    )
    
    

}

export default Forgotpassword