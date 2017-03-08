var getDistance = function(p1, p2) {

	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	lat1 = p1.lat();
	lng1 = p1.lng();
	lat2 = p2.lat();
	lng2 = p2.lng();
	console.log("p1 lat is: " + lat1);

  	var R = 6371; // km 
	//has a problem with the .toRad() method below.
	var x1 = (p2.lat() - p1.lat());
	console.log("x1 is: " + x1); 
	var dLat = x1.toRad();  
	var x2 = (p2.lng()-p1.lng());
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(p1.lat().toRad()) * Math.cos(p2.lat().toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
    console.log("a is: " + a); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	console.log("distance is: " + d);
}  	





  	var R = 6378137; // Earth’s mean radius in meter
  	var dLat = rad(p2.lat() - p1.lat());
  	var dLong = rad(p2.lng() - p1.lng());
  	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    	Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    	Math.sin(dLong / 2) * Math.sin(dLong / 2);
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  	var d = R * c;
  	console.log("distance is: " + d);
  	return d; // returns the distance in meter


function placeVehicles() {
	image = {
		url: car.jpg
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0) // anchor
	}

	var car1 = new google.maps.Marker({
		position: {lat: 42.5079771,lng:-71.0982233},
		title: "username: JANET",
		snippet: "distance from user: ??",
		icon: image,
		map: map,

	});

	var car2 = new google.maps.Marker({
		position: {lat: 42.4078704, lng:-71.12156290000001,},
		title: "username: w8XMS577",
		snippet: "distance from user: ??",
		icon: image,
		map: map,
	});
	
	var car3 = new google.maps.Marker({
		position: {lat: 0 lng: 0},
		title: "username: aSOqNo4S",
		snippet: "distance from user: ??",
		icon: image,
		map: map,
	});
}




	var car1 = new google.maps.Marker({
		position: {lat: 42.5079771,lng:-71.0982233},
		title: "username: JANET",
		snippet: "distance from user: ??",
		map: map,
	});
	car1.setMap(map);
	google.maps.event.addListener(car1, 'click', function() {
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(car1.title + " " + car1.snippet);
            infowindow.open(map, car1);
    });

	var car2 = new google.maps.Marker({
		position: {lat: 42.4078704, lng:-71.12156290000001,},
		title: "username: w8XMS577",
		snippet: "distance from user: ??",
		map: map,
	});
	car2.setMap(map);
	
	var car3 = new google.maps.Marker({
		position: {lat: 0, lng: 0},
		title: "username: aSOqNo4S",
		snippet: "distance from user: ??",
		map: map,
	});
	car3.setMap(map);
}