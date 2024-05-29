import {  useState } from "react";
import { useDispatch} from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { resetpassword } from "../../Redux/Slices/authslice";


function Resetpassword()
{

  const dispatch = useDispatch()
    // const navigate = useNavigate();
    const {resetToken} = useParams()
    
    // console.log("The resetToken is" , resetToken )
     const [userpassword , setpassword] = useState({
        password:"",
        token:resetToken
     })

    
    // console.log("The userpassword is " ,userpassword)
    
    function handleUserInput(e)
    {
       
        const{name , value} = e.target
         setpassword({
            ...userpassword,
            [name]:value
        })
        e.preventDefault()
        // console.log("name*****" , name)
    }
    

  async function onformsubmit(e)
  {
    e.preventDefault()
   

    if(!userpassword.password)
        {
            toast.error("Enter your new password")
            return 
        }

        await dispatch(resetpassword({userpassword}))
   
   
  setpassword({
    password:" "
  })
}
    
    //Creating th UI for the Forgot password page .............
    
    return(
        <HomeLayout>
    
    <form noValidate onSubmit={onformsubmit}
    className="min-h-screen flex items-center justify-center text-white">
    
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
    
            <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Create a new Password</h1>
    
    <div className="px-4 space-y-5 text-center">
         
    <p className="text-[17px]">
    
Your password must be at least 8 characters and should include atleast one uppercase character and atleast one number. It should <span className="text-yellow-500">not</span> include any <span  className="text-yellow-500">special character.</span>

</p>
    
    
{/* //Password block.............. */}

<div className="flex flex-col gap-3">

<label htmlFor="passwprd" className="font-semibold "></label>

<div className="flex flex-col">
<input

type="password" 
required
name='password'
id="password"
placeholder="Enter your new Password"
className="bg-transparent px-2 py-1  border"
onChange={handleUserInput}
value={userpassword.password}
/>

</div>


    <button type="submit" className="font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 px-3 cursor-pointer text-lg mt-4" >
        Reset your Password 
        </button>
    </div>
    
    </div>
    
        </div>
    
    
    </form>
    
        </HomeLayout>
    )
}


export default Resetpassword