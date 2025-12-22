// detail.js
// Requires movies-data.js

function getQueryParam(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

const id = parseInt(getQueryParam('id'), 10);
const detailWrap = document.getElementById('detail');

if (!id) {
  detailWrap.innerHTML = `<div style="color:var(--muted)">No movie id. <a href="index.html">Back to list</a></div>`;
} else {
  const m = MOVIES.find(x => x.id === id);
  if (!m) {
    detailWrap.innerHTML = `<div style="color:var(--muted)">Movie not found. <a href="index.html">Back to list</a></div>`;
  } else {
    detailWrap.innerHTML = `
      <div class="poster-large">
        <img src="${m.poster}" alt="${escapeHtml(m.title)}">
      </div>
      <div class="detail-info dark-bg">
        <h1 class="detail-title">${escapeHtml(m.title)}</h1>
        <div class="detail-meta">⭐ IMDb: ${m.rating}<br>${m.votes.toLocaleString()} voters</div>
        <p class="description">${escapeHtml(m.description)}</p>
        <h3>Cast:</h3>
        <ul class="cast-list">
          ${m.cast.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
        <div class="buttons">
          <button class="btn watch-trailer">▶ Watch Trailer</button>
          <button class="btn tickets-btn">🎟 Tickets</button>
        </div>
      </div>
    `;

    // Add event listener to Watch Trailer button
    const watchTrailerBtn = detailWrap.querySelector('.watch-trailer');
    watchTrailerBtn.addEventListener('click', () => {
      showMovieDetailsWithShowtimes(m);
    });

    // Add event listener to Tickets button
    const ticketsBtn = detailWrap.querySelector('.tickets-btn');
    ticketsBtn.addEventListener('click', () => {
      showNearbyTheatersAndShowtimes(m);
    });
  }
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'<','>':'>','"':'"',"'":'&#39;' })[m]); }

function showNearbyTheatersAndShowtimes(movie) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="modal-body">
        <h2 class="modal-title">${escapeHtml(movie.title)} - Nearby Theaters</h2>
        <div class="theater-info">
          <h3>${escapeHtml(movie.cinema)} (Most Popular Theater)</h3>
          <p>Location: Boston, MA</p>
          <div class="modal-showtimes">
            <h4 style="margin-bottom: 10px; color: var(--accent);">Popular Showtimes</h4>
            ${movie.showtimes && movie.showtimes.length > 0 ? movie.showtimes.map(st => `<button class="showtime-btn">${st.date} at ${st.time}</button>`).join('') : '<p style="color: var(--muted);">No showtimes available</p>'}
          </div>
          <a href="booking.html?type=movie&id=${movie.id}" class="btn book-tickets-btn">Book Tickets</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // Close modal on click outside or close button
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target.classList.contains('close-modal')) {
      document.body.removeChild(modalOverlay);
    }
  });
}

function showMovieDetailsWithShowtimes(movie) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="modal-body" style="display: flex; gap: 20px; align-items: flex-start;">
        <div class="modal-poster">
          <img src="${movie.poster}" alt="${escapeHtml(movie.title)}">
        </div>
        <div class="modal-info" style="flex: 1;">
          <h2 class="modal-title">${escapeHtml(movie.title)}</h2>
          <div class="modal-meta" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>Language: ${movie.language || 'N/A'}</span>
            <span>Cinema: ${movie.cinema || 'N/A'}</span>
          </div>
          <div class="modal-showtimes">
            <h4 style="margin-bottom: 10px; color: var(--accent);">Showtimes</h4>
            ${movie.showtimes && movie.showtimes.length > 0 ? movie.showtimes.map(st => `<button class="showtime-btn">${st.date} at ${st.time}</button>`).join('') : '<p style="color: var(--muted);">No showtimes available</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // Close modal on click outside or close button
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target.classList.contains('close-modal')) {
      document.body.removeChild(modalOverlay);
    }
  });
}
