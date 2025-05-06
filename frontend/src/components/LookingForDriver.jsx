// import React from "react";

// const LookingForDriver = (props) => {
//   return (
//     <div>
//       <h5
//         // ref={panelRef}
//         onClick={() => {
//           // console.log("Opening vehicle panel");
//           props.setLookingForDriver(false);
//           props.setConfirmRidePanel(true);
//         }}
//         className=" p-1 text-center w-[90%] absolute top-0 "
//       >
//         <i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i>
//       </h5>

//       <h3 className="text-2xl font-semibold mb-5">Looking For Driver</h3>

//       <div className="flex gap-5 justify-between flex-col items-center">
//         <img
//           className="h-20"
//           src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
//           alt=""
//         />
//         <div className="w-full">
//           <div className="flex gap-4 m-2 p-3 items-center  border-gray-500 border-b-2 mt-5">
//             <i className="ri-map-pin-2-fill text-lg"></i>
//             <div>
//               <h3 className="font-medium text-lg">562/11-A</h3>
//               <p className="text-sm text-gray-600">
//                 {" "}
//                 dinbaitekPurwa, gonda, uttar pradesh
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-4 m-2 p-3 items-center  border-gray-400 border-b-2 mt-5">
//             <i className="ri-map-2-line"></i>
//             <div>
//               <h3 className="font-medium text-lg">562/11-A</h3>
//               <p className="text-sm text-gray-600">
//                 {" "}
//                 dinbaitekPurwa, gonda, uttar pradesh
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-4 m-2  p-3 items-center   border-gray-500 border-b-2 mt-5">
//             <i className="ri-cash-line"></i>
//             <div>
//               <h3 className="font-medium text-lg">170₹</h3>
//               <p className="text-sm text-gray-600">Cash Cash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LookingForDriver;
import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

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
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver