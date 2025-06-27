"use strict";

const input = document.getElementById("searchinput");
const formm = document.getElementById("formm");
const SetError = document.getElementById("SetError");
const removeforSetError = document.getElementById("removeforSetError");


input.addEventListener("blur", function () {

    (async function () {
        await getWeather(input.value);

    })();

});


formm.addEventListener("submit", function (e) {

    e.preventDefault();

    (async function () {
        await getWeather(input.value);

    })();

});




async function getWeather(city) {
    try {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b84cd9020d00497988104314252506&q=${city ? city : "cairo"}&days=3`);
        const data = await res.json();
        console.log("data", data);

        if (data) {
            removeforSetError.classList.remove("d-none");
            SetError.classList.replace("d-block", "d-none");

        }


        if (!res.ok) {
            throw new Error(`something went wrong : ${res.statusText}`);
        }


        weatherDisplay(data);

    } catch (error) {
        console.log("error");
        SetError.classList.replace("d-none", "d-block");
        removeforSetError.classList.add("d-none");
    }

}





(async function () {
    await getWeather();

})();






//How to add the degrees celcius symbol in JavaScript
//https://stackoverflow.com/questions/32543662/how-to-add-the-degrees-celcius-symbol-in-javascript



function weatherDisplay(list) {

    const box = `
            <div class="col-lg-4 ">
                <div class="card text-bg-secondary  border-top-left-radius border-top-Right-radius border-bottom-left-radius-992px">
                    <div class="card-header  d-flex justify-content-between  fontColor">
                        <span>${getDayName(list.current.last_updated)}</span>
                        <span>${getDayMonthName(list.current.last_updated)}</span>
                    </div>
                    <div class="card-body fontColor">

                        <h5 class="card-title mt-3">${list.location.country}</h5>
                        <span class="card-text fs-custum-huge fs-custum-sm text-white fw-bold">${list.current.temp_c}&deg;C</span>
                        <img src="https:${list.current.condition.icon}" alt="" class="wHImg ">
                        <span class="spanColor">${list.current.condition.text}</span>
                        
                        <div class="d-flex pt-3 mb-2">
                            <div class="pe-4">
                                <span><img src="images/icon-umberella.png" alt=""></span>
                                <span>${list.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                            </div>

                            <div class="pe-4">
                                <span><img src="images/icon-wind.png" alt=""></span>
                                <span>${list.current.wind_kph}km/h</span>
                            </div>


                            <div>
                                <span><img src="images/icon-compass.png" alt=""></span>
                                <span>${getFullWindDirection(list.current.wind_dir)}</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>




            <div class="col-lg-4  text-center">
                <div class="card text-bg-secondary backg  w-100 h-100">
                    <div class="card-header fontColor">${getDayName(list.forecast.forecastday[1].date)}</div>
                    <div class="card-body ">
                    <div class="d-flex flex-column justify-content-center align-items-center fontColor mx-4">
                        <img class="w-h mb-3"  src="https:${list.forecast.forecastday[1].day.condition.icon}" alt="">
                        <span class="fs-custum-small fw-bold text-white">${list.forecast.forecastday[1].day.avgtemp_c}&deg;C</span>
                        <span class="mb-3">${list.forecast.forecastday[1].day.maxtemp_c}&deg;C</span>
                        <span class="spanColor">${list.forecast.forecastday[1].day.condition.text}</span>
                    </div>
                    </div>
                </div>
            </div>




            <div class="col-lg-4 text-center ">
                <div class="card text-bg-secondary mb-3 border-bottom-Right-radius border-bottom-left-radius border-top-Right-radius-992px h-100">
                    <div class="card-header fontColor">${getDayName(list.forecast.forecastday[2].date)}</div>
                    <div class="card-body ">
                    <div class="d-flex flex-column justify-content-center align-items-center  fontColor mx-4">
                        <img class="w-h mb-3"  src="https:${list.forecast.forecastday[2].day.condition.icon}" alt="">
                        <span class="fs-custum-small fw-bold text-white">${list.forecast.forecastday[2].day.avgtemp_c}&deg;C</span>
                        <span class="mb-3">${list.forecast.forecastday[2].day.maxtemp_c}&deg;C</span>
                        <span class="spanColor">${list.forecast.forecastday[2].day.condition.text}</span>
                    </div>
                    </div>
                </div>
            </div>

`


    document.getElementById("dataSend").innerHTML = box;

}









//https://stackoverflow.com/questions/24998624/day-name-from-date-in-js
function getDayName(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: 'long' });
}




function getDayMonthName(dateStr) {

    const dateString = dateStr;
    const date = new Date(dateString);

    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];

    const formattedDate = `${day}${month}`;

    return formattedDate;

}





//fast generated by ai
function getFullWindDirection(abbreviation) {
    switch (abbreviation.toUpperCase()) {
        // Cardinal
        case 'N': return 'North';
        case 'E': return 'East';
        case 'S': return 'South';
        case 'W': return 'West';

        // Intercardinal
        case 'NE': return 'Northeast';
        case 'SE': return 'Southeast';
        case 'SW': return 'Southwest';
        case 'NW': return 'Northwest';

        // Half-Winds
        case 'NNE': return 'North-Northeast';
        case 'ENE': return 'East-Northeast';
        case 'ESE': return 'East-Southeast';
        case 'SSE': return 'South-Southeast';
        case 'SSW': return 'South-Southwest';
        case 'WSW': return 'West-Southwest';
        case 'WNW': return 'West-Northwest';
        case 'NNW': return 'North-Northwest';

        default: return 'Unknown direction';
    }
}






