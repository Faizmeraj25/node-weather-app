// console.log('You Need to learn Javascript !!');

//To fetch an api from client side for json data.
// fetch('/weather?address=Kualalumpur').then( (response) => {
//     response.json().then( (data) => {
//         if(data.error)
//             return console.log(data.error);
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form')
const searchBox = document.getElementById('address')
const weatherResult = document.querySelector('.weather-result')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = searchBox.value
    weatherResult.innerHTML = '<h5>Loading...</h5>'
    
    //To fetch an api from client side for json data.
fetch(`/weather?address=${address}`).then( (response) => {
    response.json().then( (data) => {
        if(data.error)
            return weatherResult.textContent = data.error;
        console.log(data);
        return weatherResult.innerHTML= `<h3>${data.place_name}</h3><p><b>${data.response.weather_desc} :</b> It is currenly ${data.response.current_temp} degree Celcuis in ${data.response.location_name}. Current Precipitation level is ${data.response.rain_prob}mm. </p>`
    })
})

    
})
console.log(weatherForm );