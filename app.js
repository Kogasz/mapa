
var map = L.map('map').setView([52.505, 19.5], 7);

map.dragging.disable(); 
map.scrollWheelZoom.disable();


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/ui-3-1/512/address-512.png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var firstMarker = L.marker([52.18543184394124, 21.571585927415825], {icon: greenIcon}).addTo(map);

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
 
for(let i=0;i<=powiaty.features.length-1;i++){
    var powiat = powiaty.features[i]
    var mapapowiat = L.geoJSON(powiat).addTo(map)
    mapapowiat.bindTooltip(powiat.properties.nazwa)
    if(powiat.properties.nazwa == "powiat miński"){
        L.geoJSON(powiat, {color: "red"}).addTo(map)
    }
    mapapowiat.on('click',function(){
        mapapowiat.setStyle({
            color:"red"
        })
    })
}


