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
@Table(name = "passenger")
public class Passenger {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    private Integer age;
    private Character gender;
    private String passportNo;
    private String mealPref;

    public Passenger(String firstname, String lastname, Integer age, Character gender, String passportNo, String mealPref) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.gender = gender;
        this.passportNo = passportNo;
        this.mealPref = mealPref;
    }
}
