package com.example.flightticketbookingsystem.booking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private Double amount;

    public Payment(Double amount) {
        this.amount = amount;
    }
}
