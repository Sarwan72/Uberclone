import React from 'react'
import { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainDetails = () => {


  const { captain } = useContext(CaptainDataContext)
  return (
    <div>
        <div className="gap-5 justify-between items-center">
           <div>
           <img  className="fixed mt-4 left-5 mb-20 h-10 w-10 bg-white flex items-center justify-center rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUIAcXgRaNDVvwWAkLcM5twP2KbyCMjPaqg&s" alt="" />
           </div>
        
          <div className="ml-16">
          <h4 className="text-lg font-medium capitalize" >{captain?.fullname.firstname + " " + captain?.fullname.lastname }</h4>
            <h4 className="font-medium text-lg" >₹290</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex gap-4 justify-between ">
          <div className=" text-center">
            <i className="text-2xl font-thin ri-time-zone-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour </p>
          </div>
          <div className=" text-center">
            <i className="text-2xl font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour Online</p>
          </div>
          <div className=" text-center">
            <i className="text-2xl font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails