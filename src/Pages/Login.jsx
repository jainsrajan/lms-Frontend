import { useState } from "react"
import Footer from "../Components/Footer"
import HomeLayout from "../Layouts/HomeLayout"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { loginAccount } from "../Redux/Slices/authslice"

function Login()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const[previewImage , setPrevImage] = useState("")

    const [loginData , setloginData] = useState({

   email:"",
   password:"",
    
    })

    function handleUserInput(e)
    {
       
        const{name , value} = e.target
        setloginData({
            ...loginData,
            [name]:value
        })
        e.preventDefault()
        // console.log("name*****" , name)
    }

    async function Onlogin(event)
    {
console.log("srajan")
        event.preventDefault()

        if(!loginData.email || !loginData.password)

        {
            toast.error("Please fill all the details")
            return;
        }

    //dispatch login account action......

  const response = await dispatch(loginAccount(loginData))
  console.log("The response is.....",response)

  if(response?.payload?.success)
  {
    navigate("/")
  }

  setloginData({

    email:"",
    password:"",

   })

}
    return (

<HomeLayout>

<div className ="flex items-center justify-center h-[100vh]" >

    <form noValidate onSubmit={Onlogin} className = "flex flex-col gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">

<h1 className = "text-center text-2xl font-bold">Login Page</h1>


 {/* Email................. */}
 <div className="flex flex-col gap-1">

    <label htmlFor="email" className="font-semibold">Email</label>

    <input 

    type="email" 
    required
    name='email'
    id="email"
    placeholder="Enter your email..."
    className="bg-transparent px-2  border"
    onChange={handleUserInput}
    value={loginData.email}
    />

 </div>


{/* Passowrd........... */}
 <div className="flex flex-col gap-1">

    <label htmlFor="password" className="font-semibold">Password</label>

    <input

    type="password" 
    required
    name='password'
    id="password"
    placeholder="Enter your password..."
    className="bg-transparent px-2  border"
    onChange={handleUserInput}
    value={loginData.password}/>

 </div>

 <button type="submit" className="font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 cursor-pointer  text-lg mt-4">Login</button>

 <p  className="text-center">Don't have an account?<Link to='/signup'><span className="link font-semibold text-accent"> Signup</span></Link></p>

 <p  className="text-center"><Link to='/forgotpassword'><span className="link font-semibold text-accent"> Forgot Password?</span></Link></p>

 
 

    </form>
</div>


{/* <Footer/> */}
</HomeLayout>

    )
}

export default Login