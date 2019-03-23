// const distanceUrl = 'https://jsonplaceholder.typicode.com/todos/1'
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
let count = 0
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
   
   var distanceQuery = distanceUrl + '?' + $.param(distanceQueryParams)
   
   $.get(distanceQuery, function(result) {
    console.log(result)   
    $('#distance-result').text(result)
   })
})
