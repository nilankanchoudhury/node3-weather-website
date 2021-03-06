const request = require('request')

const geocode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibmlsYW5rYW4iLCJhIjoiY2p2Y2V1cmtsMXgwajQzbnQ4OHI1YjVlZCJ9._Sauzhcx4D8fc_0GUeEYaA&limit=1'

    // request({url: url, json:true},(error,response)=>{
        request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service !',undefined)
        }else if(body.features.length === 0){
            callback('No matching results for the place entered !',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports =  geocode