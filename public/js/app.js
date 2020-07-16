const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//Elements
const $sendLocationButton = document.querySelector('#send-location')




weatherForm.addEventListener('submit',  (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then(response => {
        response.json().then(data => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
                lat:position.coords.latitude,
                lon:position.coords.longitude
            }
        fetch(`/weatherByLocation?latitude=${coords.lat}&longitude=${coords.lon}`).then(response => {
            response.json().then(data => {
                if(data.error){
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
            $sendLocationButton.removeAttribute('disabled')
            // console.log('Location shared!')
        })  
    })
})