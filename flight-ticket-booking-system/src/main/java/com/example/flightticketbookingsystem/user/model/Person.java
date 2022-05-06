package com.example.flightticketbookingsystem.user.model;

import com.example.flightticketbookingsystem.booking.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id")
    private Contact contact;
    private String role;


    public Person(String username, String firstname, String lastname, String password, Contact contact ) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.contact = contact;
    }
}
