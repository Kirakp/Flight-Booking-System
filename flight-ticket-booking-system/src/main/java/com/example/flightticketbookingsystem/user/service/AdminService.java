package com.example.flightticketbookingsystem.user.service;

import com.example.flightticketbookingsystem.user.model.Person;
import com.example.flightticketbookingsystem.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Person registerAdmin(Person person) {
        Optional<Person> userByUserName = userRepository.findUserByUsername(person.getUsername());
        if (userByUserName.isPresent())
            throw new IllegalStateException("user with username '" + person.getUsername() + "' already exists.");
        else {
            person.setPassword(passwordEncoder.encode(person.getPassword()));
            person.setRole("ADMIN");
            System.out.println(person);
            return userRepository.save(person);
        }
    }
}
