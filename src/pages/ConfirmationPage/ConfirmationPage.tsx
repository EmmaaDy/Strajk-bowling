import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { BookingResponse } from '../../types/BookingTypes';
import './ConfirmationPage.css';

const ConfirmationPage: React.FC = () => {
  // Retrieve state passed through navigation (contains booking details)
  const { state } = useLocation();
  const booking: BookingResponse | undefined = state as BookingResponse | undefined;
  const navigate = useNavigate();

  // Handle case where booking information is missing
  if (!booking) {
    return (
      <div className="no-booking-container">
        <Header title="Oops!" />
        <div className="no-booking-message">
          No booking information available!
        </div>
        <button className="back-to-booking-button" onClick={() => navigate('/booking')}>
          Back to Booking
        </button>
      </div>
    );
  }

  // Redirect the user to the homepage
  const handleRedirect = () => {
    navigate('/');
  };

  // Function to remove the period after the month name in the formatted date
  const formatDateWithoutDot = (dateString: string) => dateString.replace('.', '');

  // Format the booking time to use a period instead of a colon (e.g., "12.30" instead of "12:30")
  const formattedTime = new Date(booking.when);
  const hours = formattedTime.getHours().toString().padStart(2, '0'); // Ensure two-digit hours
  const minutes = formattedTime.getMinutes().toString().padStart(2, '0'); // Ensure two-digit minutes
  const timeWithDot = `${hours}.${minutes}`; // Combine hours and minutes with a period

  // Format the booking date in a short Swedish format (e.g., "15 Nov")
  const formattedDate = formatDateWithoutDot(
    new Date(booking.when).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
    })
  );

  // Combine the formatted time and date
  const formattedWhen = `${timeWithDot}, ${formattedDate}`;

  return (
    <div className="confirmation-page">
      <Header title="See You Soon!" />
      <form className="confirmation-form">
        <div className="section">
          <h2 className="heading-when-what-who">Booking Details</h2>

          {/* Display the date and time of the booking */}
          <div className="booking-detail">
            <fieldset>
              <legend>WHEN</legend>
              <p>{formattedWhen}</p>
            </fieldset>
          </div>

          {/* Display the number of participants */}
          <div className="booking-detail">
            <fieldset>
              <legend>WHO</legend>
              <p>{booking.people} pers</p>
            </fieldset>
          </div>

          {/* Display the number of lanes booked */}
          <div className="booking-detail">
            <fieldset>
              <legend>LANES</legend>
              <p>{booking.lanes} lane</p>
            </fieldset>
          </div>

          {/* Display the unique booking ID */}
          <div className="booking-detail">
            <fieldset>
              <legend>BOOKING NUMBER</legend>
              <p>{booking.id}</p>
            </fieldset>
          </div>

          {/* Display the total price */}
          <div className="total-container">
            <h3>Total</h3>
            <p>{booking.price} sek</p>
          </div>

          {/* Call-to-action button to navigate to the homepage */}
          <div className="cta-container">
            <button onClick={handleRedirect} className="cta-button">
              SWEET, LET'S GO!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationPage;
