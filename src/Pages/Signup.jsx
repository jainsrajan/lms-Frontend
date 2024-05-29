import { useEffect, useMemo, useState } from "react"
// import Footer from "../Components/Footer"
import HomeLayout from "../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/authslice"
import { IsEmail, IsvalidPassword } from "../Helpers/RegexMatcher"
// import CountrySelector from "../Helpers/CountryList.js"
import axios from "axios"


function Signup()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const[countries , setCountry] = useState([])
    const[previewImage , setPrevImage] = useState("")

    const [signupData , setsignupData] = useState({

        fullName:"",
        email:"",
        password:"",
        avatar:"",
        country:""
    })

    function handleUserInput(e)
    {
        const{name , value} = e.target
        setsignupData({
            ...signupData,
            [name]:value
        })

        console.log("name*****" , name)
    }

    // console.log("The signup data is......." , signupData)

    function getImage(event)
    {
        event.preventDefault()
        const uploadImage = event.target.files[0]
        
        console.log("upload image is----", uploadImage)

        if(uploadImage)
        {
            setsignupData({
                ...signupData,
                avatar:uploadImage
            })

            const filereader = new FileReader()
            filereader.readAsDataURL(uploadImage)
            filereader.addEventListener("load" , function()
            {
                setPrevImage(this.result)
            })
        }

        console.log("prevriamge is" , previewImage)

    }



    async function createNewAccount(event)
    {

        event.preventDefault()

        if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar || !signupData.country)

        {
            toast.error("Please fill all the details")
            return;
            
        }

     if(signupData.fullName.length < 5)
     {
        toast.error("Name should be atleast of 5 character")
        return;
     }
     

if(!IsEmail(signupData.email))
{
      toast.error("Email id is not valid")
      return
}

if(!IsvalidPassword(signupData.password))
{
     toast.error("Minimum eight characters, at least one capital letter and atleast one number is required")
}

const formdata = new FormData()

formdata.append("fullName" , signupData.fullName)
formdata.append("email" , signupData.email)
formdata.append("password" , signupData.password)
formdata.append("avatar" , signupData.avatar)
formdata.append("country" , signupData.country)


    //dispatch create account action......

  const response = await dispatch(createAccount(formdata))
  console.log("The response is.....", response)

  if(response?.payload?.success)
  {
    navigate("/")
  }

  setsignupData({

    fullName:"",
    email:"",
    password:"",
    avatar:"",
    country:""
})

setPrevImage("")

    }

    useEffect(()=>{

         async function fetchData()
         {

            const response = await axios.get("https://countriesnow.space/api/v0.1/countries/iso")

            let result = response.data.data
  
            let res = (result.map((element)=>{
              return ({
                  countryName:element.name,
                  id:element.Iso2,
                  id2:element.Iso3
              })
            }))
  
            setCountry(res)
  
           
            countries.map((e)=>{
              console.log(e.countryName , e.id)
          })
        }
        fetchData()
         
      },[])
  

         

         
// console.log("The countries are ",countries);

    return (


<HomeLayout>

<div className ="flex items-center justify-center h-[100vh]" >

    <form noValidate onSubmit={createNewAccount} className = "flex flex-col gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">

<h1 className = "text-center text-2xl font-bold">Registration Page</h1>

<label htmlFor="image_uploads" className="cursor-pointer">

{previewImage ?(
    <img  alt="" className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
) :
(
    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
)
}

</label>

<input className="hidden"
onChange={getImage}
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
id="fullName"
placeholder="Enter your full name..."
className="bg-transparent px-2  border"
onChange={handleUserInput}
value={signupData.fullName}
/>

</div>


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
    value={signupData.email}
    />

 </div>


{/* Passowrd........... */}
 <div className="flex flex-col gap-1">

    <label htmlFor="email" className="font-semibold">Password</label>

    <input

    type="password" 
    required
    name='password'
    id="password"
    placeholder="Enter your password..."
    className="bg-transparent px-2  border"
    onChange={handleUserInput}
    value={signupData.password}
    
    />

 </div>


{/* Selecting the Country........... */}

<label htmlFor="country" className="font-semibold flex flex-col gap-1">Country

<div className="flex flex-col">

<select className="bg-transparent  border text-white" onChange={handleUserInput} id="country" name="country">

    <option >Select Country</option>
   
    {countries.map(country=>(
             <option key={country.id} value={country.countryName} className="text-black">
{country.countryName}

             </option>
          ))}

   
    </select>


</div>


    </label>




 <button type="submit" className="font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 cursor-pointer  text-lg mt-4">Create Account</button>

 <p  className="text-center">Already have an account ? <Link to='/login'><span className="link font-semibold text-accent">Login</span></Link></p>

    </form>
</div>


{/* <Footer/> */}
</HomeLayout>

    )
}

export default Signup