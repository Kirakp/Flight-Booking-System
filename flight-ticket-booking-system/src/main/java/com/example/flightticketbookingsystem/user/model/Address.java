package com.example.flightticketbookingsystem.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String type;
    private String addressLine;
    private Long zipCode;
    private String city;
    private String state;
    private String country;
}
