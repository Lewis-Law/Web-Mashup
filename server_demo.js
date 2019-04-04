var http = require('http');
var url = require('url');
var request = require('request');
const mapsKey = "AIzaSyCUndX9q6DNUNk5W2P73TedOhynXKREpxM"; //API key – need to use your own
// Request string, without input. Input will be added later on.
const placeAPI =
"https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+mapsKey+"&input=";
http.createServer(function (req, res) {
let q = url.parse(req.url, true); // returns an url object
// q.query contains URL parameters as an object, i.e. {input: ‘whatever user typed’}
let qinput = q.query.input; // qinput now has user input
    request(placeAPI+qinput, function(error, response, body){
    // construct the JSON response to send back to client
        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
        res.write(JSON.stringify(body)); //write a response to the client in JSON
        res.end(); //end the response
    });
}).listen(8081); 

