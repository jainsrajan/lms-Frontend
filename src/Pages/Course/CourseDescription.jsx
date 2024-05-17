import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useSelector } from "react-redux"

function CourseDescription()
{

    const {state} = useLocation()
    const {role , data} = useSelector((state)=> state?.auth)
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(state)
    },[])

    return (
    
     <HomeLayout>

<div className="min-h-[100vh] pt-12 px-20 flex flex-col items-center justify-center text-white">

<div className="grid grid-cols-2 gap-4 relative">

    <div className="space-y-3">

        <img className="w-full h-64"
        alt=""
        src={state?.thumbnail?.secure_url} />

    </div>

    {/* DIVISION PART................. */}
    
<div className="sapce-y-4">
<div className="flex flex-col items-center justify-center text-xl gap-2">

<p className="font-bold">

<span className="text-yellow-500 text-bold"> 

    Total Lectures:{" "}
</span>

{state?.numbersOfLectures}
</p>


<p className="font-bold">

<span className="text-yellow-500 text-bold"> 

    Instructor:{" "}
</span>

{state?.createdBy}
</p>

</div>

{role ==='ADMIN' || data?.subscription?.status === 'active' ? (
<button onClick={()=>navigate('/course/displaylectures' , {state:{...state}})} className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300 mt-5">
Watch lectures
</button>
):(
    <button onClick={()=> navigate('/checkout')}  className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300 mt-8">
Subscribe
    </button>

)} 

</div>

<div className='space-y-2 text-xl'>

    <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">

       {state?.title}

    </h1>

    <p className="text-yellow-500">
        Course Description: <span  className="text-white">{state?.description}</span>
    </p>
    </div>

</div>

</div>

     </HomeLayout>

    )

}

export default CourseDescription