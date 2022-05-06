package com.example.flightticketbookingsystem.flight.repository;

import com.example.flightticketbookingsystem.flight.model.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightStatusRepo extends JpaRepository<FlightStatus,Integer> {
}
