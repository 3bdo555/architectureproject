import { getUser, getTickets, getItemTitle } from './data.js';
function renderTickets(user) {
  const ticketsList = document.getElementById('tickets-list');
  const tickets = getTickets().filter(t => t.userId === user.id);
  ticketsList.innerHTML = tickets.length === 0 ? '<p>No tickets yet.</p>' : `
    <ul class="ticket-list">
      ${tickets.map(t => `
        <li>
          <strong>${t.type === 'movie' ? 'Movie' : 'Event'}:</strong> ${getItemTitle({type: t.type, itemId: t.itemId})}<br>
          <strong>Seats:</strong> ${t.seats.join(', ')}<br>
          <strong>Issued At:</strong> ${new Date(t.issuedAt).toLocaleString()}
        </li>
      `).join('')}
    </ul>
  `;
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'<','>':'>','"':'"',"'":'&#39;' })[m]); }
