// Type for sending a booking request
export interface BookingData {
  when: string;       // Date and time of the booking
  lanes: number;      // Number of lanes booked
  people: number;     // Number of people in the booking
  shoes: number[];    // Shoe sizes for each player
}

// Type for receiving a booking confirmation from the server
export interface BookingResponse extends BookingData {
  price: number;      // Total price of the booking
  id: string;         // Booking ID (generated on the server)
  active: boolean;    // Booking status (e.g., active or inactive)
}
