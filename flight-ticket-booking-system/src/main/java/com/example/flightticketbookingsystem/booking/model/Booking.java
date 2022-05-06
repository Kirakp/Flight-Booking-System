package com.example.flightticketbookingsystem.booking.model;

import com.example.flightticketbookingsystem.flight.model.Flight;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private Long bookingNumber;
    @Temporal(TemporalType.DATE)
    private Date bookingDate;
    @Temporal(TemporalType.DATE)
    private Date travelDate;
    private String departureLocation;
    private String arrivalLocation;
    private Double travelCost;
    private Integer numberOfSeats;
    private String typeOfSeats;
    private Integer bookedFlightId;
    private String username;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Passenger> passengerList;

    @OneToOne(cascade = CascadeType.ALL)
    private Payment payment;

    public Booking(Long bookingNumber, Date bookingDate, Date travelDate, String departureLocation, String arrivalLocation, Double travelCost, Integer numberOfSeats, String typeOfSeats, Integer bookedFlightId, String username, List<Passenger> passengerList, Payment payment) {
        this.bookingNumber = bookingNumber;
        this.bookingDate = bookingDate;
        this.travelDate = travelDate;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.travelCost = travelCost;
        this.numberOfSeats = numberOfSeats;
        this.typeOfSeats = typeOfSeats;
        this.bookedFlightId = bookedFlightId;
        this.username = username;
        this.passengerList = passengerList;
        this.payment = payment;
    }
}
