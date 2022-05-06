package com.example.flightticketbookingsystem.flight.controller;

import com.example.flightticketbookingsystem.flight.model.Fleet;
import com.example.flightticketbookingsystem.flight.service.FleetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api/fleet")
public class FleetController {

    FleetService fleetService;

    @Autowired
    public FleetController(FleetService fleetService) {
        this.fleetService = fleetService;
    }

    @GetMapping("/get_all")
    public ResponseEntity<List<Fleet>> getAll(){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/fleet/add").toUriString());
        return ResponseEntity.created(uri).body(fleetService.getAll());
    }

    @GetMapping("/get_fleet")
    public ResponseEntity<Fleet> getAll(@RequestParam Integer id){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/fleet/add").toUriString());
        return ResponseEntity.created(uri).body(fleetService.getFleet(id));
    }

    @PostMapping("/add")
    public ResponseEntity<Fleet> addFleet(@RequestBody Fleet fleet){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/fleet/add").toUriString());
        return ResponseEntity.created(uri).body(fleetService.addFleet(fleet));
    }

    @PutMapping("/update")
    public ResponseEntity<Fleet> updateFleet(@RequestBody Fleet fleet){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/fleet/update").toUriString());
        return ResponseEntity.created(uri).body(fleetService.updateFleet(fleet));
    }

    @DeleteMapping("/delete")
    public void updateFleet(@RequestParam Integer id){
        fleetService.deleteFleet(id);
    }

}
