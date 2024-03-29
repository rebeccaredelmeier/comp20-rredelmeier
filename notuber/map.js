var myLat;
var myLng;
var infowindow;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    infowindow = new google.maps.InfoWindow();
    getMyLocation();
}

function loadVehiclesPassengers() {
    var http = new XMLHttpRequest();
    var url = "https://sheltered-springs-94170.herokuapp.com/submit";
    var params = "username=toA5vnc1&lat=10.0&lng=10.0";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            var JSONresponse = JSON.parse(http.responseText);
            if ("vehicles" in JSONresponse) {
            	placeVehicles(JSONresponse);
            }
            else if ("passengers" in JSONresponse) {
            	placePassengers(JSONresponse);
            }
            else {
            	alert("Unable to load passengers/vehicles");
            }
        }
    }
    http.send(params);
}

//source: https://tuftsdev.github.io/
//        WebProgramming/examples/google_maps/geolocation_map.html
function getMyLocation() {
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            loadVehiclesPassengers(); //once my location is found, load vehicles/passengers depending
            map.panTo({lat:myLat, lng:myLng});
            image = {
            	url: "me.png",
            	scaledSize: new google.maps.Size(50, 50),
            	origin: new google.maps.Point(0,0), // origin
    			anchor: new google.maps.Point(0, 0) // anchor
            };
            var marker = new google.maps.Marker({
                    position: {lat:myLat, lng:myLng},
                    title: "rredel01",
                    icon: image,
                    map: map,
            });
            marker.setMap(map);
         
            // Open info window on click of marker
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(marker.title);
                infowindow.open(map, marker);
            });
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}

function placeVehicles(JSONresponse) {
	image = {
        url: "car.jpg",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0) // anchor
    };

	var marker, i;
	for (i = 0; i < JSONresponse.vehicles.length; i++) {
		var markerPoint = new google.maps.LatLng(JSONresponse.vehicles[i].lat, JSONresponse.vehicles[i].lng);
		var me = new google.maps.LatLng(myLat, myLng);
		var distance = getDistance(me, markerPoint);
		marker = new google.maps.Marker({
            position: {lat:JSONresponse.vehicles[i].lat, lng:JSONresponse.vehicles[i].lng},
            title: "Name: " + JSONresponse.vehicles[i].username,
            snippet: ", distance from you: " + distance + " miles",
            icon: image,
            map: map,
        }); 
        marker.setMap(map);
        // Allow each marker to have an info window 
        // Source: https://wrightshq.com/playground/
        // 		   placing-multiple-markers-on-a-google-map-using-api-3/   
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(marker.title + marker.snippet);
                infowindow.open(map, marker);
            }
        })(marker, i));
	}

}

function placePassengers(JSONresponse) {
    image = {
        url: "passenger.jpg",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0) // anchor
    };

	var marker, i;
	for (i = 0; i < JSONresponse.passengers.length; i++) {
		var markerPoint = new google.maps.LatLng(JSONresponse.passengers[i].lat, JSONresponse.passengers[i].lng);
		var me = new google.maps.LatLng(myLat, myLng);
		var distance = getDistance(me, markerPoint);
		marker = new google.maps.Marker({
            position: {lat:JSONresponse.passengers[i].lat, lng:JSONresponse.passengers[i].lng},
            title: "Name: " + JSONresponse.passengers[i].username,
            snippet: ", distance from you: " + distance + " miles",
            icon: image,
            map: map,
        }); 
        marker.setMap(map);
        // Allow each marker to have an info window 
        // Source: https://wrightshq.com/playground/
        // 		   placing-multiple-markers-on-a-google-map-using-api-3/   
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(marker.title + marker.snippet);
                infowindow.open(map, marker);
            }
        })(marker, i));
	}

}

//get distance between me and vehicle/passenger
//source for haverstine formula: http://stackoverflow.com/
//	questions/14560999/using-the-haversine-formula-in-javascript
var getDistance = function(p1, p2) {

	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	lat1 = p1.lat();
	lng1 = p1.lng();
	lat2 = p2.lat();
	lng2 = p2.lng();

  	var R = 6371; // km 
	
	var x1 = (p2.lat() - p1.lat());
	var dLat = x1.toRad();  
	var x2 = (p2.lng()-p1.lng());
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(p1.lat().toRad()) * Math.cos(p2.lat().toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;

	var MILES_TO_KM = 0.621371;
	d = d * MILES_TO_KM; 
	return d;
}
