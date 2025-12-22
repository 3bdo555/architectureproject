// data.js - Sample data for theatres, events, users, bookings
// Uses localStorage for persistence

// Initialize data if not exists
if (!localStorage.getItem('THEATRES')) {
  localStorage.setItem('THEATRES', JSON.stringify([
    { id: 1, name: 'AMC Theatres', location: 'Boston, MA', address: '123 Main St' },
    { id: 2, name: 'Regal Cinemas', location: 'Cambridge, MA', address: '456 Elm St' },
    { id: 3, name: 'Cinemark', location: 'Somerville, MA', address: '789 Oak Ave' },
    { id: 4, name: 'Alamo Drafthouse', location: 'Brookline, MA', address: '101 Pine Rd' },
    { id: 5, name: 'Landmark Theatres', location: 'Newton, MA', address: '202 Maple Ln' },
    { id: 6, name: 'Showcase Cinemas', location: 'Waltham, MA', address: '303 Birch Blvd' },
    { id: 7, name: 'Cineplex Odeon', location: 'Quincy, MA', address: '404 Cedar St' },
    { id: 8, name: 'Marcus Theatres', location: 'Framingham, MA', address: '505 Spruce Ave' },
    { id: 9, name: 'Bow Tie Cinemas', location: 'Natick, MA', address: '606 Willow Rd' },
    { id: 10, name: 'Rialto Pictures', location: 'Arlington, MA', address: '707 Ash Ln' }
  ]));
}

if (!localStorage.getItem('EVENTS')) {
  localStorage.setItem('EVENTS', JSON.stringify([
    {
      id: 1,
      title: 'Food Festival in Boston',
      description: 'A grand food festival featuring cuisines from around the world.',
      date: '2023-12-15',
      price: 25,
      venue: 'Boston Commons',
      address: '139 Tremont St, Boston, MA',
      capacity: 1000
    },
    {
      id: 2,
      title: 'Music Concert: Jazz Nights',
      description: 'An evening of smooth jazz with local and international artists.',
      date: '2023-12-20',
      price: 50,
      venue: 'House of Blues',
      address: '15 Lansdowne St, Boston, MA',
      capacity: 500
    }
  ]));
}

if (!localStorage.getItem('USERS')) {
  localStorage.setItem('USERS', JSON.stringify([
    {
      id: 1,
      username: 'alice',
      password: 'alice',
      role: 'customer',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      address: '123 Main St, Boston, MA',
      bookings: []
    },
    {
      id: 2,
      username: 'bob',
      password: 'bob',
      role: 'vendor',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      address: '456 Elm St, Cambridge, MA',
      bookings: []
    },
    {
      id: 3,
      username: 'admin',
      password: 'admin',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      address: '789 Oak Ave, Somerville, MA',
      bookings: []
    }
  ]));
}

if (!localStorage.getItem('BOOKINGS')) {
  localStorage.setItem('BOOKINGS', JSON.stringify([]));
}

if (!localStorage.getItem('PAYMENTS')) {
  localStorage.setItem('PAYMENTS', JSON.stringify([]));
}

if (!localStorage.getItem('TICKETS')) {
  localStorage.setItem('TICKETS', JSON.stringify([]));
}

// Helper functions to get/set data
function getTheatres() { return JSON.parse(localStorage.getItem('THEATRES')) || []; }
function setTheatres(data) { localStorage.setItem('THEATRES', JSON.stringify(data)); }

function getEvents() { return JSON.parse(localStorage.getItem('EVENTS')) || []; }
function setEvents(data) { localStorage.setItem('EVENTS', JSON.stringify(data)); }

function getUsers() { return JSON.parse(localStorage.getItem('USERS')) || []; }
function setUsers(data) { localStorage.setItem('USERS', JSON.stringify(data)); }

function getBookings() { return JSON.parse(localStorage.getItem('BOOKINGS')) || []; }
function setBookings(data) { localStorage.setItem('BOOKINGS', JSON.stringify(data)); }

function getPayments() { return JSON.parse(localStorage.getItem('PAYMENTS')) || []; }
function setPayments(data) { localStorage.setItem('PAYMENTS', JSON.stringify(data)); }

function getTickets() { return JSON.parse(localStorage.getItem('TICKETS')) || []; }
function setTickets(data) { localStorage.setItem('TICKETS', JSON.stringify(data)); }

// Current user session
function getCurrentUser() { return JSON.parse(localStorage.getItem('currentUser')) || null; }
function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
function logout() { localStorage.removeItem('currentUser'); }

// Expire pending bookings older than their expireAt timestamp
function expireOldBookings() {
  const bookings = getBookings();
  const now = Date.now();
  let changed = false;
  bookings.forEach(b => {
    if (b && b.status === 'pending' && b.expireAt && now > b.expireAt) {
      b.status = 'expired';
      changed = true;
    }
  });
  if (changed) setBookings(bookings);
  return bookings;
}

// Cancel a booking by id (mark as cancelled)
function cancelBooking(bookingId) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx === -1) return false;
  bookings[idx].status = 'cancelled';
  setBookings(bookings);
  return true;
}

// Booking hold configuration (milliseconds)
function getBookingHoldMs() {
  const v = parseInt(localStorage.getItem('BOOKING_HOLD_MS'), 10);
  if (Number.isFinite(v) && v > 0) return v;
  return 10 * 60 * 1000; // default 10 minutes
}
function setBookingHoldMs(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return false;
  localStorage.setItem('BOOKING_HOLD_MS', String(ms));
  return true;
}
