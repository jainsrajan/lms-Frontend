import { useDispatch, useSelector } from "react-redux"
import { getAllcourses } from "../../Redux/Slices/Courseslice"
import { useEffect } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import Coursecard from "../../Components/Coursecard"

function Courselist()
{

const dispatch = useDispatch()

const {courseData} = useSelector((state)=>state.course) 

async function loadCourses(){

     await dispatch(getAllcourses())

}
console.log("the coursedata is",courseData)

useEffect(()=>{
loadCourses()
},[])

return(


<HomeLayout>
<div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">


<h1 className="text-center text-3xl font-semibold mt-5">Explore the courses made by
    <span className="font-bold text-yellow-500">
        Industry Experts
    </span>
    </h1>

    <div className="mb-10 flex flex-wrap gap-14">

{courseData?.map((element)=>{
    return <Coursecard key={element._id} data = {element}/>
})}
    </div>

</div>

</HomeLayout>


)


}

export default Courselist