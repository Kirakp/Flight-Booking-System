package com.example.flightticketbookingsystem.flight.repository;

import com.example.flightticketbookingsystem.flight.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepo extends JpaRepository<Location,Integer> {
    Location findLocationsByAirportName(String airportName);
    List<Location> findLocationByName(String name);

    @Query("select name from Location order by name")
    List<String> findAllByName();
}
