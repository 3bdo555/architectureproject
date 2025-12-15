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
          <button class="btn">🎟 Tickets</button>
        </div>
      </div>
    `;

    // Add event listener to Watch Trailer button
    const watchTrailerBtn = detailWrap.querySelector('.watch-trailer');
    watchTrailerBtn.addEventListener('click', () => {
      showMovieDetailsWithShowtimes(m);
    });
  }
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]); }
