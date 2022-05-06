package com.example.flightticketbookingsystem.flight.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.FetchType.EAGER;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String departureLocation;
    private String arrivalLocation;

    @Temporal(TemporalType.DATE)
    private Date departureTime;

    @Temporal(TemporalType.DATE)
    private Date arrivalTime;

    @OneToOne(fetch = EAGER,cascade = CascadeType.ALL)
    private Fleet fleet;

    @OneToOne(fetch = EAGER, cascade = CascadeType.ALL)
    private FlightStatus status;

    @OneToOne(fetch = EAGER, cascade = CascadeType.ALL)
    private Fare fare;


}
