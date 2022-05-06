package com.example.flightticketbookingsystem.flight.service;

import com.example.flightticketbookingsystem.flight.model.Location;
import com.example.flightticketbookingsystem.flight.repository.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LocationService {
    LocationRepo locationRepo;

    @Autowired
    public LocationService(LocationRepo locationRepo) {
        this.locationRepo = locationRepo;
    }


    public List<Location> getAll(){return locationRepo.findAll();}

    public Location addLocation(Location location) {
        return locationRepo.save(location);
    }

    public List<Location> findLocationByName(String name) {
        return locationRepo.findLocationByName(name);
    }

    public Location findLocationByAirportName(String airportName) {
        return locationRepo.findLocationsByAirportName(airportName);
    }

    public Location updateLocation(Location location) {
        Optional<Location> location1 = locationRepo.findById(location.getId());
        if (location1.isPresent()) {
            location1.get().setCode(location.getCode());
            location1.get().setName(location.getName());
            location1.get().setAirportName(location.getAirportName());
            location1.get().setCountry(location.getCountry());
            return location1.get();
        } else
            throw new IllegalStateException("No location Found");
    }

    public void deleteLocation(Integer id) {
        locationRepo.deleteById(id);
    }

    public List<String> getAllNames() {
        return locationRepo.findAllByName();
    }
}
