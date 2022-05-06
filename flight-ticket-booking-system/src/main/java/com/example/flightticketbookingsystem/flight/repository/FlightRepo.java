package com.example.flightticketbookingsystem.flight.repository;

import com.example.flightticketbookingsystem.flight.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepo extends JpaRepository<Flight,Integer> {
    List<Flight> findAllByDepartureLocation(String departureLocation);

    List<Flight> findAllByArrivalLocation(String departure);
}
