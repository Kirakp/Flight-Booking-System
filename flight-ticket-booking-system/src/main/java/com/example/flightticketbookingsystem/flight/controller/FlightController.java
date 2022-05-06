package com.example.flightticketbookingsystem.flight.controller;

import com.example.flightticketbookingsystem.flight.model.Flight;
import com.example.flightticketbookingsystem.flight.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api/flight")
public class FlightController {
    FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/get_all")
    public ResponseEntity<List<Flight>> getAllFlight(){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/flight/get_all").toUriString());
        return ResponseEntity.created(uri).body(flightService.getAllFlight());
    }

    @GetMapping("/get_flight")
    public ResponseEntity<Flight> getFight(@RequestParam Integer id){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/flight/get_flight").toUriString());
        return ResponseEntity.created(uri).body(flightService.getFlight(id));
    }

    @PostMapping("/add")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/flight/add").toUriString());
        return ResponseEntity.created(uri).body(flightService.addFlight(flight));
    }

    @GetMapping("/search_flights")
    public ResponseEntity<List<Flight>> searchFlights(@RequestParam("departure") String departure, @RequestParam("arrival") String arrival){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/flight/search_flights").toUriString());
        return ResponseEntity.created(uri).body(flightService.searchFlights(departure,arrival));
    }

    @PutMapping("/update")
    public ResponseEntity<Flight> modifyFlight(@RequestBody Flight flight){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/flight/update").toUriString());
        return ResponseEntity.created(uri).body(flightService.modifyFlight(flight));
    }

    @DeleteMapping("/delete")
    public void deleteFlight(@RequestParam Integer id){
        flightService.deleteFlight(id);
    }
}
