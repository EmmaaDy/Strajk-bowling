import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './BookingPage.css';
import { useNavigate } from 'react-router-dom';

const BookingPage: React.FC = () => {
  // States to manage form inputs
  const [date, setDate] = useState<string>(''); // Selected date
  const [time, setTime] = useState<string>(''); // Selected time
  const [participants, setParticipants] = useState<number | null>(null); // Number of participants
  const [lanes, setLanes] = useState<number | null>(null); // Number of lanes
  const [shoeSizes, setShoeSizes] = useState<(number | null)[]>([]); // Shoe sizes for participants
  const [error, setError] = useState<string>(''); // Error message for validation issues
  const navigate = useNavigate();

  // Function to calculate today's date in the format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero for month
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero for day
    return `${year}-${month}-${day}`;
  };

  // Update shoe sizes when the number of participants changes
  useEffect(() => {
    if (participants === null || participants === 0) {
      setShoeSizes([]);
    } else {
      const newShoeSizes = [...shoeSizes];
      while (newShoeSizes.length < participants) {
        newShoeSizes.push(null); // Add empty slots for missing shoe sizes
      }
      setShoeSizes(newShoeSizes);
    }
  }, [participants]);

  // Validate form inputs before submission
  const validateForm = () => {
    if (participants === null || lanes === null) {
      setError('Please fill in both the number of participants and the number of lanes.');
      return false;
    }
    if (participants !== shoeSizes.filter(size => size !== null).length) {
      setError(`The number of players (${participants}) must match the number of shoe sizes provided.`);
      return false;
    }
    if (participants > lanes! * 4) {
      setError('The number of players exceeds the available lanes. A maximum of 4 players per lane is allowed.');
      return false;
    }
    setError(''); // Clear error message if validation passes
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    // Prepare booking data to be sent to the API
    const bookingData = {
      lanes: lanes!,
      people: participants!,
      shoes: shoeSizes.filter(size => size !== null) as number[], // Filter out null values
      when: `${date}T${time}`, // Combine date and time
    };

    console.log('Booking data to be sent:', bookingData);

    try {
      // Send booking data to the API
      const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
        method: 'POST',
        headers: {
          'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662', // API key for authentication
        },
        body: JSON.stringify(bookingData), // Convert booking data to JSON
      });

      if (!response.ok) throw new Error('Booking failed'); // Throw error if the response is not OK

      const bookingResponse = await response.json();
      navigate('/confirmation', { state: bookingResponse }); // Redirect to confirmation page with booking details
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong.'); // Set error message
    }
  };

  // Update a specific shoe size
  const handleShoeSizeChange = (index: number, value: number | null) => {
    const newShoeSizes = [...shoeSizes];
    newShoeSizes[index] = value;
    setShoeSizes(newShoeSizes);
  };

  // Add an additional shoe size field
  const handleAddShoeSize = () => {
    setShoeSizes([...shoeSizes, null]);
  };

  // Remove a specific shoe size field
  const handleRemoveShoeSize = (index: number) => {
    const newShoeSizes = shoeSizes.filter((_, i) => i !== index);
    setShoeSizes(newShoeSizes);
  };

  return (
    <div className="booking-page">
      <Header title="Booking" />
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Section for selecting date and time */}
        <div className="section">
          <h2 className="heading-when-what-who">When, What & Who</h2>
          <div className="date-time">
            <fieldset>
              <legend>Date</legend>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getTodayDate()} // Prevent selecting past dates
                required
              />
            </fieldset>
            <fieldset>
              <legend>Time</legend>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </fieldset>
          </div>
        </div>

        {/* Section for selecting number of participants */}
        <div className="section">
          <fieldset>
            <legend>Number of Awesome Bowlers</legend>
            <div className="input-with-pers">
              <input
                type="number"
                value={participants ?? ''}
                onChange={(e) => setParticipants(e.target.value ? Number(e.target.value) : null)}
                min="1" // Minimum number of participants is 1
                required
              />
              <span className="pers">pers</span>
            </div>
          </fieldset>
        </div>

        {/* Section for selecting number of lanes */}
        <div className="section">
          <fieldset>
            <legend>Number of Lanes</legend>
            <div className="input-with-lane">
              <input
                type="number"
                value={lanes ?? ''}
                onChange={(e) => setLanes(e.target.value ? Number(e.target.value) : null)}
                min="1" // Minimum number of lanes is 1
                required
              />
              <span className="lane">lane</span>
            </div>
          </fieldset>
        </div>

        {/* Section for shoe sizes */}
        <div className="section">
          <h2 className="heading-shoes">Shoes</h2>
          {shoeSizes.map((size, index) => (
            <div key={index} className="shoe-size-row">
              <fieldset>
                <legend>Shoe size / Person {index + 1}</legend>
                <div className="input-with-prefix">
                  <span className="prefix">Euro </span>
                  <input
                    type="number"
                    value={size ?? ''}
                    onChange={(e) => handleShoeSizeChange(index, e.target.value ? Number(e.target.value) : null)}
                    min="1"
                    required
                  />
                </div>
              </fieldset>
              {shoeSizes.length > 1 && (
                <button type="button" onClick={() => handleRemoveShoeSize(index)} className="remove-shoe-size">
                  -
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddShoeSize} className="add-shoe-size">
            +
          </button>
        </div>

        {/* Display error messages */}
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-button">
          STRIIIIIKE!
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
