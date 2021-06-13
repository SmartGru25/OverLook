import Booking from './Booking'
import Room from './Room'

export class Hotel {
  constructor() {
    this.date = '2000/12/25',
    this.rooms = [],
    this.bookings = [],
    this.availableRooms = [],
    this.pendingBookings = []
    this.availability = 0
  }
  generateRooms(rooms) {
    rooms.forEach(room => {
      this.rooms.push(new Room(room))
    })
  }
  generateBookings(bookings) {
    bookings.forEach(booking => {
      this.bookings.push(new Booking(booking))
    })
  }
  fetchCurrentDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    dd < 10 ? dd = `0${dd}` : null
    mm < 10 ? mm = `0${mm}` : null     
    this.date = `${yyyy}/${mm}/${dd}`
  }

}





