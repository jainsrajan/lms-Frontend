import { Link } from "react-router-dom"
import HomeLayout from "../Layouts/HomeLayout"
import HomePageImage from '../assets/Images/Homepageimage.png'
import Footer from "../Components/Footer"

function HomePage()
{
    return (
        <HomeLayout>

           <div className="pt-10 text-gray flex items-center justify-center gap-20 h-[90vh] xs:flex-col">
            
            <div className="w-1/2 space-y-6">

            <h1 className="text-5xl font-semibold  text-white xs:text-4xl mt-24">

            Find out Best
           <span className="text-yellow-500 font-bold">
                      Online Courses
           </span>

            </h1>
 
<p className="text-xl text-gray-200 xs:text-2xl ">

We have a large library of course taught by highly skilled and qualified faculties at a very affordable cost.

</p>


<div className="space-x-6 xs:flex flex-row gap-5 items-center justify-center">

    <Link to="/courses">

<button className="bg-yellow-500 px-4 py-2 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-3000 xs:px-8">
Explor Courses
</button>

    </Link>

    <Link to="/contact">

<button className="border border-yellow-500 px-4 py-2 rounded-md font-semibold text-lg text-white cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-3000 xs:px-8">
Contact Us
</button>

    </Link>
</div>
 </div>


{/* Image in the front page ............................................................*/}

<div className="w-1/3 flex items-center justify-center ml-5">

<img src = {HomePageImage} className="mb-10 xs:hidden" alt = 'homepage' />

</div>

           </div>
           <Footer/>

        </HomeLayout>
    )
}

export default HomePage
