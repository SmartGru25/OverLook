/* eslint-disable max-len */
// import { today } from './components/utility/getToday'

import { hide, show } from './components/utility/hideShow'

// query selectors
const home = document.querySelector('#home')
const portal = document.querySelector('#portal')
const availableRoomsView = document.querySelector('#availableRoomsView')
const guestMenu = document.querySelector('#guestMenu')
const viewCalendar = document.querySelector('#viewCalendar')
const menuHeader = document.querySelector('#menuHeader')



home.addEventListener('click', (event) => {
  event.preventDefault();  
  hide([availableRoomsView, viewCalendar])
  show([portal, guestMenu])
})



export const retrieveBook = (guestBook, selectedDate, allBookings) => {
  console.log(selectedDate)
  fetchGuestBookings(guestBook, allBookings)
  prerenderRoom(guestBook, selectedDate, selectedDate)
  hide(portal)
  show(availableRoomsView)
}

const fetchGuestBookings = (guestBook, bookings) => {
  let guest = guestBook[0]
  let hotelRooms = guest.overlook.rooms
  return bookings.forEach(booking => {
    return hotelRooms.forEach(room => {
      if (booking.userID === guest.id && booking.roomNumber === room.number) {
        guest.addBookings(room)
      }
    })
 
  })
}

const prerenderRoom = (guestBook, filter, query) => {
  availableRoomsView.innerHTML = ''        
  let guest = guestBook[0]
  console.log(guest.valuation)
  let availableRooms = guest.overlook.availableRooms
  let filteredRooms = guest.overlook.filteredByTypeRooms
  let guestBookings = guest.guestBookings
  console.log(guestBookings)
  filter === 'Date' ? guest.filterRoomsByDate(query) : guest.filterRoomsByType(query) 
  
  if (filteredRooms.length >= 1)  {
    availableRooms = filteredRooms
  } else if (filter === 'myBookings') {
    availableRooms = guestBookings
  }
  renderRooms(availableRooms)
}

const renderRooms = (availableRooms) => {
  availableRooms.forEach(room => {
    availableRoomsView.innerHTML += `     
    <article id="availableRoomsToday" aria-label="List of all available rooms for today" class="room-card">
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2)}</span></p>
  </article>`
  }) 
}

export const showCalendar = () => {
  menuHeader.innerHTML = `Find Available Rooms`
  hide(guestMenu)
  show(viewCalendar)
}


