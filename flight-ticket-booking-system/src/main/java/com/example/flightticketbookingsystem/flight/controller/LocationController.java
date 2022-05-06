package com.example.flightticketbookingsystem.flight.controller;

import com.example.flightticketbookingsystem.flight.model.Location;
import com.example.flightticketbookingsystem.flight.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api/location")
public class LocationController {
    LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }


    @GetMapping("/get_all")
    public ResponseEntity<List<Location>> getAll(){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/get_all").toUriString());
        return ResponseEntity.created(uri).body(locationService.getAll());
    }

    @GetMapping("/name")
    public ResponseEntity<List<Location>> findLocationByName(@RequestParam("name") String name){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/name").toUriString());
        return ResponseEntity.created(uri).body(locationService.findLocationByName(name));
    }

    @GetMapping("/get_all_names")
    public ResponseEntity<List<String>> getAllNames(){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/get_all_names").toUriString());
        return ResponseEntity.created(uri).body(locationService.getAllNames());
    }

    @GetMapping("/airport_name")
    public ResponseEntity<Location> findLocationByAirportName(@RequestParam("airportName") String airportName){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/airport_name").toUriString());
        return ResponseEntity.created(uri).body(locationService.findLocationByAirportName(airportName));
    }

    @PostMapping("/add")
    public ResponseEntity<Location> addLocation(@RequestBody Location location){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/add").toUriString());
        return ResponseEntity.created(uri).body(locationService.addLocation(location));
    }

    @PutMapping("/update")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/location/update").toUriString());
        return ResponseEntity.created(uri).body(locationService.updateLocation(location));
    }

    public void deleteLocation(@RequestParam Integer id){
        locationService.deleteLocation(id);
    }
}
