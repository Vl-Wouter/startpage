const storage = window.localStorage
// Search bar animation
const searchLogo = document.querySelector('#searchLogo')
const search = document.querySelector('#searchContainer')
const searchBar = document.querySelector('#searchQuery')

const switchSearch = () => {
    search.classList.toggle('--closed')
    if(search.classList.contains('--closed')) searchBar.value = ""
}

searchLogo.addEventListener('click', switchSearch)

// Hijack search form
const searchForm = document.querySelector('#googleSearch')

function searchIt(e) {
    if(e.preventDefault) e.preventDefault()

    let query = searchBar.value
    const querySplit = query.split(' ');
    const finalQuery = querySplit.join('+');
    console.log(finalQuery)
    searchBar.value = "";
    window.location.href=`https://www.google.com/search?q=${finalQuery}`

    
}
searchForm.addEventListener('submit', searchIt)

// Clock
const clockItem = document.querySelector('.clock')

const getDate = () => {
    const today = new Date()
    let hour = today.getHours()
    let minute = today.getMinutes()
    if(hour < 10) hour = `0${hour}`
    if(minute < 10) minute = `0${minute}`

    clockItem.innerHTML = `${hour} : ${minute}`
}

getDate()
setInterval(getDate, 30000)

// Setting Modal
const modal = document.querySelector('#settingModal')
const settingsIcon = document.querySelector('#settingsIcon')

const openModal = () => {
    modal.classList.remove('--hidden')
}

const closeModal = () => {
    modal.classList.add('--hidden')
}

modal.addEventListener('click', function(e) {
    if(e.target == modal) {
        closeModal()
    }
})
settingsIcon.addEventListener('click', openModal)

// location and weather
const locationItem = document.querySelector('.location')
const weatherItem = document.querySelector('.weather')
const tempItem = document.querySelector('.temp')
const keybutton = document.querySelector('#addApiKeyBtn')

const storeKey = () => {
    const key = document.querySelector('#apiKey').value
    storage.setItem('weatherApi', key)
    closeModal()
    getLocation()
}

const getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather)
    } else {

    }
}

const getWeather = (position) => {
    const {latitude, longitude} = position.coords
    const apiKey = storage.getItem('weatherApi')

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        locationItem.innerHTML = `${data.name}, ${data.sys.country}`
        const weather = data.weather[0]
        weatherItem.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.icon}@2x.png' alt='${weather.description}' />`
        tempItem.innerHTML = `${parseInt(data.main.temp)}°C`
    })

}

storage.getItem('weatherApi') ? getLocation() : openModal()
keybutton.addEventListener('click', storeKey)