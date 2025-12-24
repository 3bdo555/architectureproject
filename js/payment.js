// payment.js - PayPal payment flow for bookings
function getQueryParam(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

const bookingId = parseInt(getQueryParam('bookingId'), 10);
const paymentDetails = document.getElementById('payment-details');

if (!bookingId) {
  paymentDetails.innerHTML = '<div style="color:var(--muted)">No booking specified. <a href="../index.html">Back to home</a></div>';
} else {
  const bookings = getBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    paymentDetails.innerHTML = '<div style="color:var(--muted)">Booking not found.</div>';
  } else if (booking.status === 'confirmed') {
    paymentDetails.innerHTML = `<div class="success-message"><h2>Already Paid</h2><p>Booking ${booking.id} is already confirmed.</p><a class="btn" href="bookings.html">View My Bookings</a></div>`;
  } else {
    const seatsList = booking.seats.join(', ');
    const total = booking.seats.length * 10;
    paymentDetails.innerHTML = `
      <div class="dark-bg" style="padding:20px;border-radius:8px">
        <h2>Booking #${booking.id}</h2>
        <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p><strong>Seats:</strong> ${seatsList}</p>
        <p><strong>Total:</strong> $${total}</p>
      </div>
    `;

    // Render PayPal button
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toString()
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Mark booking as confirmed
          booking.status = 'confirmed';
          setBookings(bookings);

          // Create Payment record
          const payment = {
            id: Date.now(),
            bookingId: booking.id,
            amount: total,
            status: 'completed',
            method: 'PayPal',
            timestamp: Date.now()
          };
          const payments = getPayments();
          payments.push(payment);
          setPayments(payments);

          // Create Ticket record
          const ticket = {
            id: Date.now(),
            bookingId: booking.id,
            userId: booking.userId,
            itemId: booking.itemId,
            type: booking.type,
            seats: booking.seats,
            issuedAt: Date.now()
          };
          const tickets = getTickets();
          tickets.push(ticket);
          setTickets(tickets);

          // Send mock email (store in localStorage)
          const sent = JSON.parse(localStorage.getItem('SENT_EMAILS') || '[]');
          const emailObj = {
            to: booking.email,
            subject: `Booking Confirmation #${booking.id}`,
            body: `Your booking ${booking.id} for seats ${booking.seats.join(', ')} has been confirmed. Total: $${total}`,
            timestamp: Date.now()
          };
          sent.push(emailObj);
          localStorage.setItem('SENT_EMAILS', JSON.stringify(sent));

          // Show success, email preview and link to bookings
          paymentDetails.innerHTML = `
            <div class="success-message">
              <h2>Payment Successful ✅</h2>
              <p>Your booking ${booking.id} is confirmed. A confirmation was sent to ${escapeHtml(booking.email)} (mock).</p>
              <div style="margin-top:12px"><a class="btn" href="bookings.html">View My Bookings</a></div>
            </div>
          `;

          // Append an email preview panel
          const preview = document.createElement('div');
          preview.className = 'dark-bg';
          preview.style.marginTop = '12px';
          preview.innerHTML = `
            <h3>Email Preview</h3>
            <strong>To:</strong> ${escapeHtml(emailObj.to)}<br>
            <strong>Subject:</strong> ${escapeHtml(emailObj.subject)}
            <pre style="white-space:pre-wrap;background:#fff;color:#000;padding:10px;border-radius:6px;margin-top:8px">${escapeHtml(emailObj.body)}</pre>
          `;
          paymentDetails.appendChild(preview);
        });
      }
    }).render('#paypal-button-container');
  }
}

// Helper functions available from data.js: getBookings, setBookings, escapeHtml
