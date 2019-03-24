const originAddress = '1120 112th Ave NE Bellevue WA 98004'
const destinationAddress = '8001 Greenwood Ave N, Seattle, WA 98103' // ADI
const apiKey = 'AIzaSyAciWtCnB8EdadekShFPBzCirE065e2inQ'

var protocol = 'https'
var distanceMatrixHost = 'maps.googleapis.com'
var distanceMatrixPath = 'maps/api/distancematrix'
var distanceOutputFormat = 'json'

var distanceUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json'

var distanceQueryParams = {
    origins: originAddress,
    destinations: destinationAddress,
    mode: 'driving',
    language: 'en',
    unit: 'metrics',
    departure_time: 'now',
    traffic_model: 'best_guess',
    key: apiKey
};

let $ = require('jquery')  // jQuery now loaded and assigned to $
let estimatedTime = "--"
$('#distance-result').text(estimatedTime)
$('#check-button').on('click', () => {   
   var distanceQuery = distanceUrl + '?' + $.param(distanceQueryParams)
   
   var distanceEstimateResult = {}
   fetch(distanceQuery)
   .then(response => {
        if (response.ok) {
            return response.json()
        }            
        else {
            throw new Error("Failed to connect to distance API.")
        }
            
   })
   .then(function(responseJson) {
       console.log(responseJson)
       distanceEstimateResult = responseJson
   
       var elements = distanceEstimateResult.rows[0].elements
       var estimatedTime = elements[0].duration_in_traffic.text
       $('#distance-result').text(estimatedTime)
    })
   .catch(function(error) {
       console.log(error.message)
   })

})  

/*
{
   "destination_addresses" : [ "8001 Greenwood Ave N, Seattle, WA 98103, USA" ],
   "origin_addresses" : [ "1120 112th Ave NE, Bellevue, WA 98004, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "20.7 km",
                  "value" : 20722
               },
               "duration" : {
                  "text" : "20 mins",
                  "value" : 1196
               },
               "duration_in_traffic" : {
                  "text" : "22 mins",
                  "value" : 1299
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}

*/