import { useNavigate } from "react-router-dom"

function NotFound()
{
    const navigater = useNavigate()
    return(
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1A2238]">

            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                      404
            </h1>

            <div className="bg-black text-white px-5 text-sm rounded rotate-12 absolute">
               Page not found...
            </div>

            <button>
                <a className="relative font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">  
                <span onClick={()=>navigater(-1)} className="relative text-lg  px-5 py-3 top-10 bg-[#1A2238]  border border-current">
                  Go Back  </span>  </a>
            </button>

        </div>
    )

}

export default NotFound