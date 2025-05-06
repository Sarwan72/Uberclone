import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  
  const navigate = useNavigate()

  async function endRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

          rideId: props.ride._id


      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          navigate('/captain-home')
      }

  }



  return (
    <div className='h-full'>
        <h5
      // ref={panelRef}
          onClick={()=> {
            // console.log("Opening vehicle panel"); 
            props.setFinishRidePanel(false)
          }} 
          className=" p-1 text-center w-[90%] absolute top-0 "><i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i></h5>

        <h3  className="text-2xl font-semibold mb-5">Finish this Ride</h3>
        <div className='flex items-center rounded-2xl bg-amber-400 justify-between p-3'>
            <div className='flex gap-3 items-center'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRjxrPhYbpeROqajWIU6sZUZJPHarvze-5w&s" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
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
                       <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
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
                    <h3 className='font-medium text-lg'>{props.ride?.fare}</h3>
                       <p className='text-sm text-gray-600'>Cash Cash</p>
                   </div>
                </div>

            </div>
           <div className='flex w-full  items-center justify-between'>
          
         
          <button 
          onClick={endRide}  className='w-full flex text-lg justify-center mt-2 bg-green-700 p-3 rounded-lg  text-white font-semibold'>Finish Ride</button>
           
           </div>
          
        </div>
    </div>
  )
}

export default FinishRide