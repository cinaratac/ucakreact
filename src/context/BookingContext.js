
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [myBookings, setMyBookings] = useState([]);

  const addBooking = (flight, seat) => {
   
    const newTicket = {
      ...flight,
      seat,
      pnr: 'PNR' + Math.floor(Math.random() * 10000),
      bookingDate: new Date().toLocaleDateString(),
    };
    setMyBookings([...myBookings, newTicket]);
  };

  return (
    <BookingContext.Provider value={{ myBookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};