const request = require('request')

// const forecast = (latitude,longitude,callback) =>{
    const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/bfa0921d753ee27f1281de9424a353b3/'+latitude+','+longitude

    // request({url: url, json:true},(error,response)=>{
        request({url, json:true},(error,{body})=>{
           if(error){
               callback('Unable to connect to weather service !',undefined)
           }else if(body.error) {
               callback('Unable to find the given location',undefined)
           }else{
            //    callback(undefined,'It is currently ' +response.body.currently.temperature + ' degrees out.There is a ' + response.body.currently.precipProbability +'% chance of rain.')
                callback(undefined,'It is currently ' +body.currently.temperature + ' degrees out.There is a ' + body.currently.precipProbability +'% chance of rain.')
           }
        })
}

module.exports = forecast