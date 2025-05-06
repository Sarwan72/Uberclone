// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// // import UserContext from "../context/UserContext";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';


// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [userData, setUserData] = useState({});
      
//     const { user, setUser}= useContext(UserDataContext)
//     const navigate = useNavigate()
    


//     const submitHandler =async (e) => {
//         e.preventDefault();
//           const userData={
//             email: email,
//             password: password
//           }

//           const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
//           if(response.status===200){
            
//             const data=response.data
//             setUser(data.user)
//             localStorage.setItem('token', JSON.stringify(data.user.token))
//             navigate('/home')
//           }
       
//         setEmail("");
//         setPassword("");
//     }

//   return (
//     <div className="p-7 h-screen flex flex-col justify-between ">
//       <div>
//         <img
//           className="w-16 mb-10"
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
//           alt=""
//         />
//         <form onSubmit={(e)=>{
//             submitHandler(e)
//         }} >
//           <h3 className="text-lg font-medium mb-2"> What's your email</h3>
//           <input
//             className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="email@example.com"
//               autoComplete="email"
//           />
//           <h3 className="text-lg font-medium mb-2">Enter Password</h3>
//           <input
//             className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
//             required
//             value={password}
//             onChange={(e)=>setPassword(e.target.value)}
//             type="password"
//             placeholder="password"
//             autoComplete="current-password"
//           />
//           <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
//             Login
//           </button>

//           <p className="text-center">
//             {" "}
//             New here?
//             <Link to={"/signup"} className="text-blue-700">
//               Create new Account
//             </Link>
//           </p>
//         </form>
//       </div>
//       <div>
//         <Link to={'/captain-login'} className="bg-[#0e81f3] text-white font-semibold mb-7 rounded flex item-center justify-center px-4 py-2 w-full text-lg placeholder:text-base">
//           Sign in as Captain
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
            autoComplete="current-password"
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin