package com.example.flightticketbookingsystem.flight.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fleet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String model;
    private Double totalEconomySeats;
    private Double totalPremiumSeats;
    private Double totalBusinessSeats;
}
