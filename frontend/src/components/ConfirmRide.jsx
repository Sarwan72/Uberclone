// import React from 'react'

// const ConfirmRide = (props) => {
//   return (
//     <div>
//         <h5
//       // ref={panelRef}
//           onClick={()=> {
//             // console.log("Opening vehicle panel"); 
//             props.setConfirmRidePanel(false)
//           }} 
//           className=" p-1 text-center w-[90%] absolute top-0 "><i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i></h5>

//         <h3  className="text-2xl font-semibold mb-5">Confirm your ride</h3>

//         <div className='flex gap-5 justify-between flex-col items-center'>
//             <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
//             <div className='w-full'>
//                 <div className='flex gap-4 m-2 p-3 items-center  border-gray-500 border-b-2 mt-5'>
//                    <i className="ri-map-pin-2-fill text-lg"></i>
//                    <div>
//                     <h3 className='font-medium text-lg'>562/11-A</h3>
//                        <p className='text-sm text-gray-600'>  dinbaitekPurwa, gonda, uttar pradesh</p>
//                    </div>
//                 </div>
//                 <div className='flex gap-4 m-2 p-3 items-center  border-gray-400 border-b-2 mt-5'>
//                 <i className="ri-map-2-line"></i>
//                    <div>
//                     <h3 className='font-medium text-lg'>562/11-A</h3>
//                        <p className='text-sm text-gray-600'>  dinbaitekPurwa, gonda, uttar pradesh</p>
//                    </div>
//                 </div>
//                 <div className='flex gap-4 m-2  p-3 items-center   border-gray-500 border-b-2 mt-5'>
//                    <i className="ri-cash-line"></i>
//                    <div>
//                     <h3 className='font-medium text-lg'>170₹</h3>
//                        <p className='text-sm text-gray-600'>Cash Cash</p>
//                    </div>
//                 </div>

//             </div>
//             <button onClick={()=>{
//                 props.setLookingForDriver(true)
//                 props.setConfirmRidePanel(false)
//             }} className='w-full bg-green-700 p-2 rounded-lg text-white font-semibold'>Confirm</button>
//         </div>
//     </div>
//   )
// }

// export default ConfirmRide

import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setLookingForDriver(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()

                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide