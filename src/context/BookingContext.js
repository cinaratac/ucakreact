// Dosya: src/context/BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [myBookings, setMyBookings] = useState([]);

  const addBooking = (flight, seat) => {
    // Yeni bileti listeye ekle (Rastgele bir PNR kodu oluşturarak)
    const newTicket = {
      ...flight,
      seat,
      pnr: 'PNR' + Math.floor(Math.random() * 10000), // Örn: PNR4521
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