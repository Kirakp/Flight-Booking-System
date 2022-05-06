package com.example.flightticketbookingsystem.flight.service;

import com.example.flightticketbookingsystem.flight.model.Fleet;
import com.example.flightticketbookingsystem.flight.repository.FleetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FleetService {
    FleetRepo fleetRepo;

    @Autowired
    public FleetService(FleetRepo fleetRepo) {
        this.fleetRepo = fleetRepo;
    }

    public Fleet addFleet(Fleet fleet) {
        return fleetRepo.save(fleet);
    }

    public Fleet updateFleet(Fleet fleet) {
        Optional<Fleet> fleet1 = fleetRepo.findById(fleet.getId());
        if (fleet1.isPresent()){
            fleet1.get().setCode(fleet.getCode());
            fleet1.get().setModel(fleet.getModel());
            fleet1.get().setTotalBusinessSeats(fleet.getTotalBusinessSeats());
            fleet1.get().setTotalEconomySeats(fleet.getTotalEconomySeats());
            fleet1.get().setTotalPremiumSeats(fleet.getTotalPremiumSeats());
            return fleet1.get();
        }
        else
            throw new IllegalStateException("No fleet exists");
    }

    public void deleteFleet(Integer id) {
        fleetRepo.deleteById(id);
    }

    public List<Fleet> getAll() {
        return fleetRepo.findAll();
    }

    public Fleet getFleet(Integer id) {
        return fleetRepo.findById(id).get();
    }
}
