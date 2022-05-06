package com.example.flightticketbookingsystem.booking.service;

import com.example.flightticketbookingsystem.booking.model.Booking;
import com.example.flightticketbookingsystem.booking.repository.BookingRepo;
import com.example.flightticketbookingsystem.flight.model.Flight;
import com.example.flightticketbookingsystem.flight.repository.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@Transactional
public class BookingService {
    BookingRepo bookingRepo;
    FlightRepo flightRepo;


    @Autowired
    public BookingService(BookingRepo bookingRepo, FlightRepo flightRepo) {
        this.bookingRepo = bookingRepo;
        this.flightRepo = flightRepo;
    }

    public List<Booking> bookingsOfUser(String username){
        return bookingRepo.findAllByUsername(username);
    }

    public Booking addBooking(Booking booking) {
        System.out.println(booking.getBookedFlightId());
        Optional<Flight> flight = flightRepo.findById(booking.getBookedFlightId());

        if (booking.getTypeOfSeats().toLowerCase(Locale.ROOT).equals("premium")) {
            flight.get().getStatus().setRemainingPremiumSeats(flight.get().getStatus().getRemainingPremiumSeats() - booking.getNumberOfSeats());
booking.setTravelCost(booking.getNumberOfSeats()*flight.get().getFare().getPremiumFare());
        } else if (booking.getTypeOfSeats().toLowerCase(Locale.ROOT).equals("business")) {
            flight.get().getStatus().setRemainingBusinessSeats(flight.get().getStatus().getRemainingBusinessSeats() - booking.getNumberOfSeats());
            booking.setTravelCost(booking.getNumberOfSeats()*flight.get().getFare().getBusinessFare());
        } else if (booking.getTypeOfSeats().toLowerCase(Locale.ROOT).equals("economy")) {
            flight.get().getStatus().setRemainingEconomySeats(flight.get().getStatus().getRemainingEconomySeats() - booking.getNumberOfSeats());
            booking.setTravelCost(booking.getNumberOfSeats()*flight.get().getFare().getEconomyFare());
        }
        return bookingRepo.save(booking);
    }

    public void cancelBooking(Integer id){
        bookingRepo.deleteById(id);
    }
}
