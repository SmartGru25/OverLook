import './css/styles.scss';
import {fetchHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { retrieveBook } from './domMani'
import { today } from './components/utility/getToday'

// querySelectors
const btnLogin = document.querySelector('#btnLogin')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')



export let guestBook, sendData, allBookings

window.onload = () => {
  fetchHotelData()
}

fetchHotelData()
  .then(promise => {
    guestBook = promise[0].customers.map(user => new Guest(user)) 
    allBookings = promise[2].bookings
    const filteredBookings = filterBookingsByDate(allBookings, '2020/01/31')
    guestBook.map(guest => {
      return guest.generateHotel(promise[1].rooms, filteredBookings)
    })
    retrieveBook(guestBook)
  })
  
const filterBookingsByDate = (bookings, date)  => {
  return bookings.filter(booking => {
    if (booking.date.includes(date)) {
      return booking
    }
  })
}