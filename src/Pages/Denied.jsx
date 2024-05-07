import { useNavigate } from "react-router-dom"

function Denied()
{

    const navigate = useNavigate()
    
    return(

        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">

<h1 className="text-9xl font-extrabold text-white tracking-widest ">
    403
</h1>

<div className="bg-black text-white px-2  text-sm rounded rotate-12 absolute">
    Access Denied
</div>


<button onClick={()=>navigate(-1)} className="mt-3">

<span className = "px-8 py-3 bg-yellow-500 rounded-sm font-bold  text-white hover:bg-yellow-600 transition-all ease-in-out duration-300">
    Go Back
</span>
   
</button>
 
        </main>
    )
}

export default Denied