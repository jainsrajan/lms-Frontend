import { Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Courselist from './Pages/Course/Courselist'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import Editprofile from './Pages/User/Editprofile'
import DisplayLectures from './Pages/Dashbord/DisplayLectures'
import Addlectures from './Pages/Dashbord/Addlectures'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import AdminDashboard from './Pages/Dashbord/AdminDashboard'
import ChangePassword from './Pages/User/ChangePassword'
import Forgotpassword from './Pages/User/Forgotpassword'
import Resetpassword from './Pages/User/Resetpassword'


function App() {

  return (
    <>

     <Routes>

      <Route path='/' element={<HomePage/>}> </Route>
      <Route path='/aboutus' element={<AboutUs/>}> </Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/courses' element={<Courselist/>}></Route>
      <Route path='/course/description' element={<CourseDescription/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/denied' element={<Denied/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      <Route path='/reset-password/:resetToken' element={<Resetpassword/>}></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>

      <Route path='/course/create' element={<CreateCourse/>}/>
      <Route path='/course/newlecture' element={<Addlectures/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>

      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN" , "USER"]}/>}>
      <Route path = '/user/profile' element={<Profile/>}/>
      <Route path = '/edit/profile' element={<Editprofile/>}/>
      <Route path='/course/displaylectures' element={<DisplayLectures/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/checkout/success' element={<CheckoutSuccess/>} />
      <Route path='/checkout/fail' element={<CheckoutFail/>} />
      <Route path='/changepassword' element={<ChangePassword/>} />
     
      </Route>


      <Route path='*' element={<NotFound/>}> </Route>
     </Routes>

     {/* <Footer/> */}

    </>
  )
}

export default App
