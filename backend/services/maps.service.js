// const axios= require('axios');
// const captainModel= require('../models/captain.model');
// module.exports.getAddressCoordinate = async address => {
//     // const apiKey=process.env.GOOGLE_MAPS_API;
//     // const url= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${encodeURIComponent(apiKey)}`;
//     console.log(address);
//     const url= `https://nominatim.openstreetmap.org/search`;

//     try{
//         const response = await axios.get(url, {
//             params: {
//               q: address,
//               format: 'json'
//             },
//             headers: {
//               'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
//             }
//           });
//         // const response = await axios.get(url);
//         // console.log(response.data)
//         if(response.data){
//             // const location = response.data.results[0].geometry.location;
//             return{
//                 ltd: response.data[0].lat,
//                 lng: response.data[0].lon
//             };

//         }
//         else{
//             // console.log("nahi paunche!")
//            // throw new Error('Unable to fetch coordinates');
//            throw new Error(`Unable to fetch coordinates: ${response.data.status} - ${response.data.error_message}`);

//         }
//     }
//     catch(error){
//         console.error(error);
//         throw error;
//     }
// }

// // module.exports.getDistanceTime= async(origin, destination)=> {
    
// //     if(!origin || !destination){
// //         throw new Error('Origin and destination are required');
// //     }

// //     const url= `https://nominatim.openstreetmap.org/search`;

// //     try{
// //         const response = await axios.get(url, {
// //             params: {
// //               q: origin, destination,
// //               format: 'json'
// //             },
// //             headers: {
// //               'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
// //             }
            
// //           });
// //           if (response.data.status === 'OK') {

// //             if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
// //                 throw new Error('No routes found');
// //             }

// //             return response.data.rows[ 0 ].elements[ 0 ];
// //         } else {
// //             throw new Error('Unable to fetch distance and time');
// //         }

// //     } catch (err) {
// //         console.error(err);
// //         throw err;
// //     }
// // }


// async function getDistanceTime(origin, destination) {
//   const url = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;

//   const response = await axios.get(url);

//   if (response.data.routes && response.data.routes.length > 0) {
//     return {
//       distance: response.data.routes[0].distance, // in meters
//       duration: response.data.routes[0].duration  // in seconds
//     };
//   } else {
//     throw new Error("No route found");
//   }
// }

// // Example usage:
// getDistanceTime(
//   { lat: 28.6139, lon: 77.2090 },  // Delhi
//   { lat: 19.0760, lon: 72.8777 }   // Mumbai
// ).then(console.log);



// // module.exports.getAutoCompleteSuggestions=async(input)=>{
// //     if(!input){
// //         throw new Error('Origin and destination are required');
// //     }

// //     const url= `https://nominatim.openstreetmap.org/search`;

// //     try{
// //         const response = await axios.get(url, {
// //             params: {
// //               q: input,
// //               format: 'json'
// //             },
// //             headers: {
// //               'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
// //             }
            
// //           });
// //           if(response.data.status==='OK'){
// //             return response.data.predictions;
// //           }
// //           else {
// //             throw new Error('Unable to fetch suggestions');
// //           }
          
// //         } catch(err){
// //             console.error(err);
// //             throw err;
// //         }
// //     }

// // const axios = require("axios");

// module.exports.getAutoCompleteSuggestions = async (input) => {
//   if (!input) {
//     throw new Error("Input is required");
//   }

//   const url = "https://photon.komoot.io/api/";

//   try {
//     const response = await axios.get(url, {
//       params: { q: input }
//     });

//     // Format results
//     return response.data.features.map((f) => ({
//       name: f.properties.name,
//       country: f.properties.country,
//       state: f.properties.state,
//       lat: f.geometry.coordinates[1], // latitude
//       lon: f.geometry.coordinates[0]  // longitude
//     }));
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };




//     module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

//       // radius in km
  
  
//       const captains = await captainModel.find({
//           location: {
//               $geoWithin: {
//                   $centerSphere: [ [ ltd, lng ], radius / 6371 ]
//               }
//           }
//       });
  
//       return captains;
  
  
//   }



const axios = require("axios");
const captainModel = require("../models/captain.model");

/**
 * 🔎 Convert an address string into coordinates (lat, lon)
 * Uses Nominatim API
 */
module.exports.getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search`;

  try {
    const response = await axios.get(url, {
      params: {
        q: address,
        format: "json",
      },
      headers: {
        "User-Agent": "MyApp/1.0 (karan002002m@gmail.com)", // required by Nominatim
      },
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("getAddressCoordinate Error:", error.message);
    throw error;
  }
};

/**
 * 🚖 Get route distance & time between two coordinates
 * Uses OSRM API
 */
module.exports.getDistanceTime = async (origin, destination) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;

  try {
    const response = await axios.get(url);

    if (response.data.routes && response.data.routes.length > 0) {
      return {
        distance: response.data.routes[0].distance, // meters
        duration: response.data.routes[0].duration, // seconds
      };
    } else {
      throw new Error("No route found");
    }
  } catch (error) {
    console.error("getDistanceTime Error:", error.message);
    throw error;
  }
};

/**
 * 🏙️ Autocomplete places based on search text
 * Uses Photon API
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const url = "https://photon.komoot.io/api/";

  try {
    const response = await axios.get(url, { params: { q: input } });

    return response.data.features.map((f) => ({
      name: f.properties.name,
      country: f.properties.country,
      state: f.properties.state,
      lat: f.geometry.coordinates[1], // latitude
      lon: f.geometry.coordinates[0], // longitude
    }));
  } catch (err) {
    console.error("getAutoCompleteSuggestions Error:", err.message);
    throw err;
  }
};

/**
 * 👨‍✈️ Find captains within radius (MongoDB geospatial query)
 */
module.exports.getCaptainsInTheRadius = async (lat, lon, radiusKm) => {
  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lon, lat], radiusKm / 6371], // Note: [lng, lat] order
        },
      },
    });

    return captains;
  } catch (err) {
    console.error("getCaptainsInTheRadius Error:", err.message);
    throw err;
  }
};









