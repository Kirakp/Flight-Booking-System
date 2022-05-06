package com.example.flightticketbookingsystem.booking.repository;

import com.example.flightticketbookingsystem.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking,Integer> {

    List<Booking> findAllByUsername(String username);
}
