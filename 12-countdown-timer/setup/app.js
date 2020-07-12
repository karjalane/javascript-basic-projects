const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const deadline = document.querySelector('.deadline')
const giveaway = document.querySelector('.giveaway')
const items = document.querySelectorAll('.deadline-format h4')

let futureDate = new Date(2020, 7, 30, 22, 00, 00)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]
let month = futureDate.getMonth()

const format = (item) => {
  return (item < 10) ? (item = `0${ item }`) : item
}

giveaway.textContent = `Giveaway ends on 
  ${ weekday }
  ${ date }
  ${ months[month] } 
  ${ year }, 
  ${ hours }:${ format(minutes) } `

  // future time in ms
  const futureTime = futureDate.getTime()

  const getRemTime = () => {
    const currentTime = new Date().getTime()
    const t = futureTime - currentTime

    const oneDay = 24 * 60 * 60 * 1000
    const oneHour = 60 * 60 * 1000
    const oneMinute = 60 * 1000
    const oneSecond = 1000

    let days = Math.floor(t / oneDay)
    let hours = Math.floor((t % oneDay) / oneHour)
    let minutes = Math.floor((t % oneHour) / oneMinute)
    let seconds = Math.floor((t % oneMinute) / oneSecond)

    const values = [days, hours, minutes, seconds]

    items.forEach((item, index) => {
      item.innerHTML = format(values[index])
    })
    if (t < 0) {
      clearInterval(countdown)
      deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has ended :(</h4>`
    }
  }

  // countdown
  let countdown = setInterval(getRemTime, 1000)

  getRemTime()