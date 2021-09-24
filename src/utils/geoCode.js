const request = require('request')
const geoCode = (city,callback) => {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoiZmFpem1lcmFqMjUiLCJhIjoiY2t0cXZyMTBpMGV5dDJ2a2dmcHQxMDZtZCJ9.bphDJFwGKFybz80A_Q9StA&limit=1`

    request({url:mapBoxUrl,json:true},(error,response) => {
        if(error){
            callback('Not able to reach out to Geocoding API.',undefined)
        }else if(!response.body.features.length){
                callback('No Data is fetched !',undefined)
        }else{
            callback(undefined,{
                place_name: response.body.features[0].place_name,
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })        
}
module.exports = geoCode