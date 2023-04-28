
var map = L.map('map').setView([52.505, 19.5], 7);

map.dragging.disable(); 
map.scrollWheelZoom.disable();


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var firstMarker = L.marker([52.18543184394124, 21.571585927415825]).addTo(map);

function onMapClicker(latlng) {
    var marker = L.marker(latlng).addTo(map);
    var distance = firstMarker.getLatLng().distanceTo(marker.getLatLng());
    console.log(distance / 1000 + " km ");

    var latlngs = [firstMarker.getLatLng(), marker.getLatLng()];
    var line = L.polyline(latlngs, {color: 'red'}).addTo(map);
    line.bindTooltip((distance / 1000).toFixed(2) + " km",{permanent:true});
    
}
function onMapClick(latlng) {
    L.marker(latlng).addTo(map);
}

map.on('click', function(e){
    console.log(e.latlng)
    onMapClick(e.latlng)
    onMapClicker(e.latlng)
    getData(e.latlng)
    
});

 async function getData(latlng){

 const lng = latlng.lng
 const lat = latlng.lat 

 console.log(lat)

 const data = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&namedetails=1`)
 const json = await data.json()

 console.log(json.address.county)
 }
 
 L.geoJSON(powiaty.features, {
    onEachFeature: function(feature, layer) {
        layer.on('mouseover', function(e) {
            var name = feature.properties.nazwa;
            layer.bindTooltip(name, {permanent:true}).openTooltip();
        });
        layer.on('mouseout', function(e) {
            layer.unbindTooltip();
        });
    }
}).addTo(map);

