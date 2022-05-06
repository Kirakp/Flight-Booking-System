package com.example.flightticketbookingsystem.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String email;
    private Long mobileNo;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private  Address address;
}
