package com.example.flightticketbookingsystem.user.repository;

import com.example.flightticketbookingsystem.user.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Person,Integer> {
    Optional<Person> findUserByUsername(String username);
    List<Person> findAllByRole(String role);
}
