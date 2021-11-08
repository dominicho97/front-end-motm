



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

    //Chart
    const drawChart = function (labels, data) {
        let ctx = document.querySelector(".js-chart-temperature").getContext("2d");

        let config = {
            type: "line", //geeft de soort grafiek
            data: {
                labels: labels, //al de labels die worden getoond aan de onderkant vd grafiek
                datasets: [
                    {
                        label: "Velocity(in 1000)", //label vanboven
                        backgroundColor: "#FFFFFF", // styling
                        borderColor: "#2969FF", // styling
                        data: data, // we voegen de data toe om de grafiek te vormen
                        fill: "red" //styling
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Chart.js Line Chart"
                },
                tooltips: {
                    mode: "index",
                    intersect: true
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                scale: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Hoogte"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Tijd"
                            }
                        }
                    ]
                }
            }
        };
        if (window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, config);

    };





    //Scroll animation
    function scrollAnimation() {
        ScrollReveal({ reset: true });

        ScrollReveal().reveal('.ISS-image', { delay: 250 });
        ScrollReveal().reveal('.ISS-text', { delay: 250 });
        ScrollReveal().reveal('.issMap', { delay: 250 });
    }



    let firstTimeView = true

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

        if (firstTimeView) {
            mymap.setView([roundedLatitude, roundedLongitude], 2)
            firstTimeView = false
        }

        //Fill API data to HTML
        document.getElementById("lat").textContent = roundedLatitude
        document.getElementById("long").textContent = roundedLongitude


        //CHART DATA
        console.log(data.velocity)
        console.log(data.daynum)


        //round numbers to 2 decimals
        let roundedVelocity = Math.round((data.velocity + Number.EPSILON) * 100) / 100000;
        let roundedDaynum = Math.round((data.daynum + Number.EPSILON) * 100) / 100000000;


        let velocity_label = []
        let daynum_label = []

        //push data to Chart
        velocity_label.push(roundedVelocity)
        daynum_label.push(roundedDaynum)
        drawChart(daynum_label, velocity_label)





    }






    //DOMContentLoaded
    document.addEventListener("DOMContentLoaded", function () {
        //check of de pagina juist laadt
        console.log("DOM loaded")
    })





    //functies hier oproepen! (want binnen try/catch) /function call



    getISS();

    setTimeout(
        setInterval(getISS, 3000) //be carefull for too many requests in a short period
    )



    scrollAnimation();


}
catch (error) {
    console.error('an error occured,we handled it', error);
}


