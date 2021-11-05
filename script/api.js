



//make map and tiles
const mymap = L.map('issMap').setView([0, 0], 1);


const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
tiles = L.tileLayer((tileUrl), { attribution })
tiles.addTo(mymap)


//make marker with custom icon
var markerIcon = L.icon({
    iconUrl: 'img/rocket-icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],

});

const marker = L.marker([0, 0], { icon: markerIcon }).addTo(mymap);





// API URL/ENDPOINT
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'



let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

try {



    //async de API URL Fetchen
    async function getISS() {
        const response = await fetch(api_url, { headers: customHeaders });
        const data = await response.json()
        console.log(data)
        console.log(data.longitude)
        console.log(data.latitude)

        //round numbers to 2 decimals
        let roundedLatitude = Math.round((data.latitude + Number.EPSILON) * 100) / 100;
        let roundedLongitude = Math.round((data.longitude + Number.EPSILON) * 100) / 100;

        //L.marker([roundedLatitude, roundedLongitude]).addTo(mymap);
        marker.setLatLng([roundedLatitude, roundedLongitude])


        document.getElementById("lat").textContent = roundedLatitude
        document.getElementById("long").textContent = roundedLongitude








    }

    //DOMContentLoaded
    document.addEventListener("DOMContentLoaded", function () {
        //check of de pagina juist laadt
        console.log("DOM loaded")
    })


    //functies hier oproepen! (want binnen try/catch) /function call
    getISS();


}
catch (error) {
    console.error('an error occured,we handled it', error);
}


