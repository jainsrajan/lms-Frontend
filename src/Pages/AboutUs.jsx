import HomeLayout from "../Layouts/HomeLayout"
import aboutus from '../assets/Images/aboutus.png'
import Footer from "../Components/Footer"
import CarouselSLide from "../Components/CarouselSlide"
import { celebrities } from "../Constants/CelebrityData"
function AboutUs()
{
  
    return (
        <HomeLayout>
        
<div  className="pl-20 pt-20  text-white">

    <div className=" flex items-center flex-row gap-10">
        
        <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-bold">
                Affordal and quality section
            </h1>

            <p className="text-xl text-gray-200" >Our goal is to provide the affordabel and quality education to the world.
            We are providing the platform for thr aspiring teachers and students to share 
            theis skills, creativity and Knowledge to each other to empower and contribute in the growth and welness of mankid.
            </p>

        </section>

        <div className="w-1/2">

<img  
id="test1"
style={{
    filter:"drop-shadow(0px 10px 10pxrgb(0 0 0))"
}}


className=" w-[75%] drop-shadow-2xl" 
src={aboutus}  
alt="aboutus" />
        </div>

    </div>

<div className="carousel  w-[50%] m-auto relative inset-x-64 mt-20 ">
    {celebrities && celebrities.map(celebrity=>(<CarouselSLide 
    {...celebrity}
    key= {celebrity.slideNumber} 
    totalSlides={celebrities.length} />))}

  </div>
</div>

        <Footer/>

        </HomeLayout>
    )

}


export default AboutUs