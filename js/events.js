// events.js
// Requires data.js

const eventsGrid = document.getElementById('events-grid');
const searchInput = document.getElementById('searchInput');

let eventsState = {
  query: '',
  events: getEvents().slice() // clone
};

// render functions
function filterEvents() {
  let items = getEvents().slice();

  // search filter
  const q = eventsState.query.trim().toLowerCase();
  if (q) {
    items = items.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
  }

  eventsState.events = items;
}

function renderEvents() {
  eventsGrid.innerHTML = '';

  if (eventsState.events.length === 0) {
    eventsGrid.innerHTML = `<div style="grid-column:1/-1;color:var(--muted)">No events found.</div>`;
    return;
  }

  for (const e of eventsState.events) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-name">${escapeHtml(e.title)}</div>
      <div class="event-meta">${escapeHtml(e.date)} - $${e.price}</div>
      <div class="event-description">${escapeHtml(e.description)}</div>
      <div class="event-venue">${escapeHtml(e.venue)}, ${escapeHtml(e.address)}</div>
      <button class="btn book-event">Book Now</button>
    `;
    // Add click event for booking
    const bookBtn = card.querySelector('.book-event');
    bookBtn.addEventListener('click', () => {
      // For now, redirect to booking.html with event id
      window.location.href = `booking.html?type=event&id=${e.id}`;
    });
    eventsGrid.appendChild(card);
  }
}

/* event handlers */
searchInput.addEventListener('input', (e) => {
  eventsState.query = e.target.value;
  filterEvents();
  renderEvents();
});

/* simple html escape */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'<','>':'>','"':'"',"'":'&#39;' })[m]); }

/* init */
filterEvents();
renderEvents();
