import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast"
import { IsEmail } from "../Helpers/RegexMatcher"
import axiosInstance from "../Helpers/axiosInstance"

function Contact()

{

const[userInput , setUserInput] = useState({
    name:"",
    email:"",
    message:""

})

function handleInputChange(e)
{
    
    
    const{name , value} = e.target
    

    setUserInput({
        ...userInput,
        [name]:value
    })
    e.preventDefault()
    // console.log(userInput)
}

async function onFormSubmit(e)
{
    e.preventDefault()

    if(!userInput.name || !userInput.email || !userInput.message)
    {
        toast.error("Kindly fill all the details")
        return;
    }

    if(!IsEmail(userInput.email))
    {
        toast.error("You have enetered the worng Email ")
        return;
    }

    try {
        const response = axiosInstance.post("https://lms-backend-lty4.onrender.com/api/v1/contactus/contact" , userInput)
        toast.promise(response , {
         loading:"Submitting you message, Please wait",
         success:(data)=>{
            return data?.data?.message
         },
         error:"Failed to submmit the form"
        })

     const contactresponse = await response
     if(contactresponse?.data?.success)
     {
        setUserInput({
            name:"",
            email:"",
            message:""
        })
     }

    } catch (error) {
        toast.error("operation failed....")
    }

}

    return (

       <HomeLayout>

<div className="flex items-center justify-center h-[100vh]">

<form 
noValidate
className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">

<h1 className="text-3xl font-bold">
    Contact Form
</h1>


{/* Text..................................................*/}

<div className="flex flex-col w-full gap-1">

    <label htmlFor="name" className="text-xl font-semibold">
        Name
    </label>

<input className="bg-transparent border px-2 py-1 rounded-sm"
onChange={handleInputChange}
id="name"
type="text"
name="name"
placeholder="Enter your name...." 
value={userInput.name}/>

</div>

{/* Email.............................................. */}
<div className="flex flex-col w-full gap-1">

    <label htmlFor="email" className="text-xl font-semibold">
        Email
    </label>

<input className="bg-transparent border px-2 py-1 rounded-sm"
onChange={handleInputChange}
id="email"
type="text"
value={userInput.email}
name="email"
placeholder="Enter your email..."
 />

</div>

{/* Message................................................. */}

<div className="flex flex-col w-full gap-1">

    <label htmlFor="message" className="text-xl font-semibold">
        Message
    </label>

<textarea className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
onChange={handleInputChange}
id="message"
value={userInput.message}
type="text"
name="message"
placeholder="Enter your message...." />

</div>


<button type="submit" 
onClick={onFormSubmit}
className="w-full font-semibold text-lg  bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md p-2 mt-3">
Submit
</button>

</form>

</div>


       </HomeLayout>
    )
}

export default Contact
