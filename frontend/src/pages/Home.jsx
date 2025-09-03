import React, {useContext} from "react";
import { useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
// import { userDataContext } from "../context/UserContext";
import { UserDataContext } from "../context/UserContext";

import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

//import WaitingForDriver from "../context/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  // setvehicle found == lookingfordriver
  const {socket} = useContext(SocketContext);
  const { user } = useContext(UserDataContext);


  useEffect(()=> {

    if(!user) return;
    console.log(user);
    // console.log(user);
    socket.emit("join", {userType: "user", userId: user._id})

  }, [user])
  socket.on("ride-confirmed", ride => {
    setRide(ride);
    setWaitingForDriver(true);
    setLookingForDriver(false);

  })
    socket.on("ride-started", ride => {
        // setRide(ride);
        setWaitingForDriver(false);
        // setLookingForDriver(false);
        navigate("/riding" )
    })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (lookingForDriver) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriver]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: waitingForDriver ? "translateY(0%)" : "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }
//   async function createRide() {

async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Replace this with your actual state update or handler
      console.log("Ride created:", response.data);
      setRide(response.data); // If you have a setRide hook
  
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
      // Optionally show error to user
    }
  }
  
  return (
    <div className="relative  h-screen overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
        // <LiveTracking/>
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full "
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full ">
        <div className="h-[30%] p-5 relative  bg-white">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className=" top-6 right-6 absolute text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line mb-7 absolute h-14 w-1 left-10 bottom-[6%] bg-black rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-1 py-2 mt-5  text-center text-lg rounded-lg w-full"
              type="text"
              placeholder="Kaha se Jana hai"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-1 py-2 mt-3 text-center text-lg rounded-lg w-full"
              type="text"
              placeholder="Kaha tk jana hai"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          setLookingForDriver={setLookingForDriver}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setLookingForDriver={setLookingForDriver}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setLookingForDriver={setLookingForDriver}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
