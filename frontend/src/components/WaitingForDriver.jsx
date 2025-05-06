import React from "react";

const WaitForDriver = (props) => {
  return (
    <div>
      <h5
        // ref={panelRef}
        onClick={() => {
          // console.log("Opening vehicle panel");
          props.setWaitingForDriver(false);
          // props.setConfirmRidePanel(true);
        }}
        className=" p-1 text-center w-[90%] absolute top-0 "
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i>
      </h5>

      <div className="flex items-center justify-between ">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
          alt=""
        />
        <div className="text-right" >
          <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname}</h2>
          <h4 className="text-xl font-semibold -mb-2 -mt-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-sm text-gray-600">{props.ride?.otp}</h1>
      
        </div>
      </div>

      <div className="flex gap-5 justify-between flex-col items-center">
        <div className="w-full">
          <div className="flex gap-4 m-2 p-3 items-center  border-gray-500 border-b-2 mt-5">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex gap-4 m-2 p-3 items-center  border-gray-400 border-b-2 mt-5">
            <i className="ri-map-2-line"></i>
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-sm text-gray-600">
              {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex gap-4 m-2  p-3 items-center   border-gray-500 border-b-2 mt-5">
            <i className="ri-cash-line"></i>
            <div>
              <h3 className="font-medium text-lg">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriver;
