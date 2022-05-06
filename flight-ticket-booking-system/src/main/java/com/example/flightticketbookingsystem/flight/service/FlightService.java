package com.example.flightticketbookingsystem.flight.service;

import com.example.flightticketbookingsystem.flight.model.Flight;
import com.example.flightticketbookingsystem.flight.repository.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FlightService {
    FlightRepo flightRepo;

    @Autowired
    public FlightService(FlightRepo flightRepo) {
        this.flightRepo = flightRepo;
    }

    public Flight addFlight(Flight flight) {
        flight.getStatus().setRemainingEconomySeats(flight.getFleet().getTotalEconomySeats());
        flight.getStatus().setRemainingBusinessSeats(flight.getFleet().getTotalBusinessSeats());
        flight.getStatus().setRemainingPremiumSeats(flight.getFleet().getTotalPremiumSeats());
        return flightRepo.save(flight);
    }

    public Flight modifyFlight(Flight flight) {
        Optional<Flight> flight1 = flightRepo.findById(flight.getId());
        if (flight1.isPresent()) {
            flight1.get().setDepartureLocation(flight.getDepartureLocation());
            flight1.get().setArrivalLocation(flight.getArrivalLocation());
            flight1.get().setArrivalTime(flight.getArrivalTime());
            flight1.get().setDepartureTime(flight.getDepartureTime());

            flight1.get().getFare().setPremiumFare(flight.getFare().getPremiumFare());
            flight1.get().getFare().setEconomyFare(flight.getFare().getEconomyFare());
            flight1.get().getFare().setBusinessFare(flight.getFare().getBusinessFare());

            flight1.get().getStatus().setRemainingPremiumSeats(flight.getStatus().getRemainingPremiumSeats());
            flight1.get().getStatus().setRemainingEconomySeats(flight.getStatus().getRemainingEconomySeats());
            flight1.get().getStatus().setRemainingBusinessSeats(flight.getStatus().getRemainingBusinessSeats());

            flight1.get().getFleet().setCode(flight.getFleet().getCode());
            flight1.get().getFleet().setModel(flight.getFleet().getModel());
            flight1.get().getFleet().setTotalBusinessSeats(flight.getFleet().getTotalBusinessSeats());
            flight1.get().getFleet().setTotalEconomySeats(flight.getFleet().getTotalEconomySeats());
            flight1.get().getFleet().setTotalPremiumSeats(flight.getFleet().getTotalPremiumSeats());
            return flight1.get();
        } else
            throw new IllegalStateException("");
    }

    public void deleteFlight(Integer id) {
        flightRepo.deleteById(id);
    }

    public List<Flight> getAllFlight() {
        return flightRepo.findAll();
    }

    public Flight getFlight(Integer id) {
        return flightRepo.findById(id).get();
    }

    public List<Flight> searchFlights(String departure, String arrival) {
        System.out.println(departure+" : "+arrival);
        List<Flight> allByDepartureLocation = flightRepo.findAllByDepartureLocation(departure);
        if (allByDepartureLocation.isEmpty()) {
            throw new IllegalStateException("No flights for this route");
        } else {
            List<Flight> result = new ArrayList<>();
            for(Flight flight:allByDepartureLocation){
                if (flight.getArrivalLocation().equals(arrival)){
                    result.add(flight);
                }
            }
            return result;
        }
    }
}
