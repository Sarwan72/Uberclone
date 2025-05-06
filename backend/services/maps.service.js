const axios= require('axios');
const captainModel= require('../models/captain.model');
module.exports.getAddressCoordinate = async address => {
    // const apiKey=process.env.GOOGLE_MAPS_API;
    // const url= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${encodeURIComponent(apiKey)}`;
    console.log(address);
    const url= `https://nominatim.openstreetmap.org/search`;

    try{
        const response = await axios.get(url, {
            params: {
              q: address,
              format: 'json'
            },
            headers: {
              'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
            }
          });
        // const response = await axios.get(url);
        // console.log(response.data)
        if(response.data){
            // const location = response.data.results[0].geometry.location;
            return{
                ltd: response.data[0].lat,
                lng: response.data[0].lon
            };

        }
        else{
            // console.log("nahi paunche!")
           // throw new Error('Unable to fetch coordinates');
           throw new Error(`Unable to fetch coordinates: ${response.data.status} - ${response.data.error_message}`);

        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime= async(origin, destination)=> {
    
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    const url= `https://nominatim.openstreetmap.org/search`;

    try{
        const response = await axios.get(url, {
            params: {
              q: origin, destination,
              format: 'json'
            },
            headers: {
              'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
            }
            
          });
          if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions=async(input)=>{
    if(!input){
        throw new Error('Origin and destination are required');
    }

    const url= `https://nominatim.openstreetmap.org/search`;

    try{
        const response = await axios.get(url, {
            params: {
              q: input,
              format: 'json'
            },
            headers: {
              'User-Agent': 'MyApp/1.0 (karan002002m@gmail.com)'
            }
            
          });
          if(response.data.status==='OK'){
            return response.data.predictions;
          }
          else {
            throw new Error('Unable to fetch suggestions');
          }
          
        } catch(err){
            console.error(err);
            throw err;
        }
    }

    module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

      // radius in km
  
  
      const captains = await captainModel.find({
          location: {
              $geoWithin: {
                  $centerSphere: [ [ ltd, lng ], radius / 6371 ]
              }
          }
      });
  
      return captains;
  
  
  }