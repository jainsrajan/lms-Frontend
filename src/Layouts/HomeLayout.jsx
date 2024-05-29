import {FiMenu} from 'react-icons/fi' 
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
// import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Slices/authslice'


function HomeLayout({children})
{

    const dispatch = useDispatch()
    const navigate =  useNavigate()

    const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn)
    
    const role = useSelector((state)=> state?.auth?.role)

function changeWidth()
{
    const drawerSide = document.getElementsByClassName('drawer-side')
    // console.log(drawerSide)
    drawerSide[0].style.width = 'auto'
}

function hideDrawer()
{
    const element = document.getElementsByClassName("drawer-toggle")
    console.log("Elements are as follows...",element);
    element[0].checked = false

    changeWidth();
}

async function handleLogout(e)
{
    e.preventDefault()

   const res = await dispatch(logout())
   if(res?.payload?.success)
   {
    navigate("/")
   }
}

    return (

        <div className="h-fit bg-gray-900 overflow-y-hidden">
        <div className="drawer absolute left-0 z-50 w-fit">

<input className="drawer-toggle"  id="my-drawer" type="checkbox"/>

   <div className="drawer-content">

   <label htmlFor="my-drawer" className="cursor-pointer relative">

{/* <FiMenu/> */}


<FiMenu onClick={changeWidth}

      size={"32px"}
      className='font-bold m-2.5 text-white'
      
/> 
</label>

    </div>

    <div className="drawer-side">

    {/* <label htmlFor="my-drawer" className="drawer-overlay">

    </label> */}

    <ul className="menu p-4  h-[100%] sm:w-80 bg-base-300 text-base-content relative">

      <li className='w-fit absolute right-2 z-50'>   
      
       <button onClick={hideDrawer}>

<AiFillCloseCircle size={24}
/> 

       </button>
      
        </li>

        <li>
          <Link to='/' >Home</Link>
        </li>

{/* {isLoggedIn && role === 'ADMIN' &&(
           <li>

<Link to = "/admin/dashboard" >Admin Dasboard</Link>

           </li>
)} */}

{isLoggedIn && role === 'ADMIN' &&(
           <li>

<Link to = "/course/create" >Create new course</Link>

           </li>   
)}

        <li>
              <Link to='/courses'>All Courses</Link>
        </li>

        <li>
            <Link to='/contact'>Contact Us</Link>
        </li>

        <li>
            <Link to='/aboutus'>About Us</Link>
        </li>
        

{!isLoggedIn && (
    <li className = 'absolute bottom-3 mr-[35%]  '>
    <div className = 'flex items-center justify-center'>
    
    <button className='btn px-10 btn-primary font-bold rounded-md '> 
    
    <Link to = '/login'>Login</Link>
    
    </button>

    <button className='btn px-10  btn-secondary font-bold rounded-md '> 
    
    <Link to = '/Signup'>Signup</Link>
    
    </button>

    </div>
    </li>

)}


{isLoggedIn && (
    <li className= ' absolute bottom-3 mr-[35%]  '>
    <div className='w-fit flex items-center justify-center'>
    
    <button className='btn px-10  btn-primary font-bold rounded-md w-50%'> 
    
    <Link to = '/user/profile'>Profile</Link>
    
    </button>

    <button className='btn px-10 btn-secondary font-bold rounded-md w-50%'> 
    
    <Link onClick = {handleLogout}>Logout</Link>
    
    </button>

    </div>
    </li>

)}

    </ul>

    </div>

        </div>
        {children}
        {/* <Footer/> */}
        
        </div>
    )
}

export default HomeLayout