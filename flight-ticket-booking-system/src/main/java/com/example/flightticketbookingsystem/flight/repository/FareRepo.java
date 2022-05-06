package com.example.flightticketbookingsystem.flight.repository;

import com.example.flightticketbookingsystem.flight.model.Fare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FareRepo extends JpaRepository<Fare,Integer> {
}
