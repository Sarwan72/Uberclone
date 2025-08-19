import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import captain-riding from '../pages/CaptainRiding'

const ConfirmRidePopUp = (props) => {
  const [ otp, setOtp ] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
      e.preventDefault()

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
          params: {
              rideId: props.ride._id,
              otp: otp
          },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          props.setConfirmRidePopupPanel(false)
          props.setRidePopupPanel(false)
          navigate('/captain-riding', { state: { ride: props.ride } })
      }


  }
  return (
    <div className='h-screen'>
        <h5
      // ref={panelRef}
          onClick={()=> {
            // console.log("Opening vehicle panel"); 
            props.setRidePopUpPanel(false)
          }} 
          className=" p-1 text-center w-[90%] absolute top-0 "><i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i></h5>

        <h3  className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
        <div className='flex items-center rounded-2xl bg-amber-400 justify-between p-3'>
            <div className='flex gap-3 items-center'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRjxrPhYbpeROqajWIU6sZUZJPHarvze-5w&s" alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2km</h5>
            {/* <h5 className='text-lg font-semibold'>₹{props.ride?.fare}</h5> */}
        </div>

        <div className='flex gap-5 justify-between flex-col items-center'>
           
            <div className='w-full'>
                <div className='flex gap-4 m-2 p-3 items-center  border-gray-500 border-b-2 mt-5'>
                   <i className="ri-map-pin-2-fill text-lg"></i>
                   <div>
                    <h3 className='font-medium text-lg'>562/11-A</h3>
                       <p className='text-sm text-gray-600'> {props.ride?.pickup} </p>
                   </div>
                </div>
                <div className='flex gap-4 m-2 p-3 items-center  border-gray-400 border-b-2 mt-5'>
                <i className="ri-map-2-line"></i>
                   <div>
                    <h3 className='font-medium text-lg'>562/11-A</h3>
                       <p className='text-sm text-gray-600'> {props.ride?.destination} </p>
                   </div>
                </div>
                <div className='flex gap-4 m-2  p-3 items-center   border-gray-500 border-b-2 mt-5'>
                   <i className="ri-cash-line"></i>
                   <div>
                    <h3 className='font-medium text-lg'>₹{props.ride?.fare}</h3>
                       <p className='text-sm text-gray-600'>Cash Cash</p>
                   </div>
                </div>

            </div>
           <div className='flex w-full  items-center justify-between'>
          <form onSubmit={submitHandler} 
          >
           <input value={otp} onChange={(e) => setOtp(e.target.value)} className='bg-[#eee] px-18 py-2 text-lg rounded-lg w-full mt-2' type="text" placeholder='Enter OTP' />
          <button   className='w-full flex  justify-center mt-2 bg-green-700 p-3 rounded-lg  text-white font-semibold'>Confirm</button>
            <button onClick={()=>{
                props.setConfirmRidePopUpPanel(false)
                props.setRidePopUpPanel(false)
               
            }} className='w-full bg-red-600  p-3 rounded-lg text-white mt-2 font-semibold'>Cancel</button>
          </form>
           </div>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp