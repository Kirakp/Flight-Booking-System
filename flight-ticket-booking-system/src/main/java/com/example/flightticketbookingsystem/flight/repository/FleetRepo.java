package com.example.flightticketbookingsystem.flight.repository;

import com.example.flightticketbookingsystem.flight.model.Fleet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FleetRepo extends JpaRepository<Fleet,Integer> {
}
