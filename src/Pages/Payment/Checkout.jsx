import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/Paymentslice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import {BiRupee} from 'react-icons/bi'

function Checkout()
{

const dispatch = useDispatch()
const navigate = useNavigate();

const razorpayKey = useSelector((state)=>state?.razorpay?.key)
const subscription_id = useSelector((state)=>state?.razorpay?.subscription_id)
const userdata = useSelector((state)=>state?.auth?.data)



const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: ""
}

async function handleSubscription(e)
{
    e.preventDefault()

    if(!razorpayKey || !subscription_id)
        {
            toast.error("Something went wrong!!")
            return
        }
//Passing this options to the Razorpay SDK
        const options ={
            key: razorpayKey,
            subscription_id: subscription_id,
            name:'Coursify pvt Ltd',
            description:"Subscription Money",
            theme:{
              color:  "#F37254"
            },
            prefill:{
                email: userdata.email,
                name: userdata.name
            },

            handler: async function (response)
            {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id
                paymentDetails.razorpay_signature = response.razorpay_signature
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id
                   
                toast.success("Payment Successfull")

                const response1 =  await dispatch(verifyUserPayment(paymentDetails))
                // console.log("Payment verification response is ",response1);

                response1?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail")
                   
            }
    
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

}

async function load()
{
    await dispatch(getRazorpayId())
    await dispatch(purchaseCourseBundle())
}


useEffect(()=>{
load()
},[])


//Creating th UI for the CHECK-OUT page.............

return(
    <HomeLayout>

<form onSubmit={handleSubscription}
className=" min-h-screen flex items-center justify-center text-white">

    <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">

        <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription Bundle</h1>

<div className="px-4 space-y-5 text-center">
     
<p className="text-[17px]">

    This purchase will allow you to access all available course
    of our platform for {" "}

    <span className="text-yellow-500 font-bold">
        <br />
        1 year duration. {" "}
    </span>

    All the existing new launch courses will be also available.
</p>


<p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
<BiRupee/>
     <span>499</span> only
</p>

<div>
<p>100% refund on the cancellation</p>
<p>* Terms and conditions applied *</p>
</div>

<button type="submit" className= "font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-400 rounded-md py-2 px-14 cursor-pointer text-lg mt-4" >
    Click to Checkout
</button>

</div>

    </div>


</form>

    </HomeLayout>
)

}

export default Checkout