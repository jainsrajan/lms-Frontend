import { Chart, Pie } from "react-chartjs-2"
import HomeLayout from "../../Layouts/HomeLayout"
import { ArcElement , BarElement , CategoryScale, Chart as ChartJS, Tooltip , Legend , LinearScale, Title} from "chart.js"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { deleteCourse, getAllcourses } from "../../Redux/Slices/Courseslice"
import { getStatsData } from "../../Redux/Slices/StatSlice"
import { getPaymentRecord } from "../../Redux/Slices/Paymentslice"
import { BsBorderWidth } from "react-icons/bs"

ChartJS.register(ArcElement , Tooltip , Legend , CategoryScale  , LinearScale , Title ,  BarElement)

function AdminDashboard()
{

const dispatch = useDispatch()
const navigate = useNavigate()

const{allUsersCount , subscribedCount} = useSelector((state)=>state.stat)
const{  allPayments,finalMonths,monthlySalesRecord  } = useSelector((state)=>state.razorpay)

const userData = {
    labels:["Registered User" , "Enrolled User"],
    datasets:[{
        label:"User Details",
        data:[allUsersCount , subscribedCount],
        backgroundColor:["yellow" , "green"],
        borderWidth:1, 
        borderColor:["yellow" , "green"]
    }]
}

const salesData = {
    labels:["Jan" , "Feb" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"],

    fontColor:"white",
    datasets:[
        {
            label: "Sales / Month",
            data: monthlySalesRecord,
            backgroundColo:["rgb(255 , 99 , 132)"],
            borderWidth:2
        }  
    ]
} 

const myCourses = useSelector((state)=>state?.course?.courseData);

async function onCourseDelete(id)
{
    if(window.confirm("Are you sure you want to delete the course ?"))
        {
            const res = await dispatch(deleteCourse(id))
            {
                if(res?.payload?.success)
                    {
                        await dispatch(getAllcourses());
                    }
            }
        }
}

   
useEffect(()=>{
    async ()=>{

        await dispatch(getAllcourses())
        await dispatch(getStatsData())
        await dispatch(getPaymentRecord())
    }
},[])

return (
    
    <HomeLayout>

<div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">

<h1 className="text-center text-5xl font-semibold text-yellow-500">
    Admin Dashboard
</h1>

<div className="grid grid-cols-2 gap-5 m-auto mx-10">

    <div className="flex flex-col items-center gap-10 pt-5 shadow-lg rounded-md">

        <div className="w-80 h-80">

            <Pie data={userData}/>   

        </div>

    </div>

</div>


</div>


    </HomeLayout>
)
}

export default AdminDashboard