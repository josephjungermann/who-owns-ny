// warn setup

// first get all of the industries
const industries = warn.features.map(f => f.properties.Industry);


function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

// then extract the list of distinct industry names
const distinct_industries = industries.filter(onlyUnique);

//then get a count of points for each distinct industry
const industry_breakdown = distinct_industries.map(d => {
	return {
		industry: d,
		count: industries.filter(point => point === d).length
	}
});

//then reorder the list of industries by point count descending
industry_breakdown.sort((a, b) => b.count - a.count);

//take the top 10 industries by point count
const top_ten = industry_breakdown.slice(0, 10);

function filter_points(filter) {
	let point_layer = Object.assign({}, warn);
	const features = point_layer.features.filter(p => p.properties.Industry === filter);

	Object.assign(point_layer, { features: features });

	console.log(point_layer);
	return point_layer;
}


// Set const to import map template and set lon, lat and zoom point on page load
const mymap = L.map('covidMap').setView([40.712, -74.006], 6.5);

// Import map style tile layer from MapBox with api key
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/dark-v9',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1Ijoiam9zZXBoanVuZ2VybWFubiIsImEiOiJjazl5b3lldHUwMGF1M21wYWZxZGxtaXFrIn0.SIGcJf1ElkmPBC0Gs31ktw'
}).addTo(mymap);

// Add layer control event and filter for each Industry.

const industry_layers = {};

//look at each of the top ten industries
top_ten.forEach((industry, i) => {
	//color palette of 10
	const palette = [
		"#ff7800",
		"#B2E6D4",
		"#CB8589",
		"#6969B3",
		"#98C1D9",
		"#E1BC29",
		"#F1BF98",
		"#DF2935",
		"#606C38",
		"#8093F1"
	];

	// creates marker styles and injetcs a color from the palette
	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: palette[i],
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	// update the layers object with this industry's data. Also, build a popup for each point
	industry_layers[industry.industry] = L.geoJson(filter_points(industry.industry), {
		pointToLayer: (feature, latlng) => L.circleMarker(latlng, geojsonMarkerOptions),
		onEachFeature: (feature, layer) => {
			layer.bindPopup(`
				<h1 class='infoHeader'>WARN Notice</h1>
				<p class='infoHeader'>Notice Date: ${feature.properties.NoticeDate}</p>
				<p class='infoHeader'>Reason: ${feature.properties.Reason}</p>
				<p class='infoHeader'>Company: ${feature.properties.Company}</p>
				<p class='infoHeader'>Address: ${feature.properties.Address}</p>
				<p class='infoHeader'>Industry: ${feature.properties.Industry}</p>
				<p class='infoHeader'>Total Employees Affected: ${feature.properties.TotalEmployeesAffected}</p>
			`);
		}
	});

	//add the industry to the map by default so that it's toggled on on page load

	industry_layers[industry.industry].addTo(mymap);
});

L.control.layers(null, industry_layers).addTo(mymap);

// Add GeoJSON and for event click on marker, show data properties
function myEvent(feature, layer) {
	layer.bindPopup("<h1 class='infoHeader'>WARN Notice</h1><p class ='infoHeader'>Notice Date: " + feature.properties.NoticeDate + "</p><p class='infoHeader'>Reason: " + feature.properties.Reason + "</p><p class ='infoHeader'>Company: " + feature.properties.Company + "</p><p class ='infoHeader'>Address: " + feature.properties.Address + "</p><p class ='infoHeader'>Industry: " + feature.properties.Industry + "</p><p class ='infoHeader'>Total Employees Affected: " + feature.properties.TotalEmployeesAffected + "</p>");
};

//L.geoJSON(point_layer, {
//onEachFeature: myEvent
//}).addTo(mymap);