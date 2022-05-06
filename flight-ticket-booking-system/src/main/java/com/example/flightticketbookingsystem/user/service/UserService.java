package com.example.flightticketbookingsystem.user.service;

import com.example.flightticketbookingsystem.user.model.Person;
import com.example.flightticketbookingsystem.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Person> person = userRepository.findUserByUsername(username);
        if (person.isEmpty()) throw new UsernameNotFoundException("user doesn't exists!");
        else {
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(person.get().getRole()));
            return new org.springframework.security.core.userdetails.User(person.get().getUsername(), person.get().getPassword(), authorities);
        }
    }

    public Person registerUser(Person person) {
        Optional<Person> userByUserName = userRepository.findUserByUsername(person.getUsername());
        if (userByUserName.isPresent())
            throw new IllegalStateException("user with username '" + person.getUsername() + "' already exists.");
        else {
            person.setPassword(passwordEncoder.encode(person.getPassword()));
            person.setRole("USER");
            System.out.println(person);
            return userRepository.save(person);
        }
    }

    public List<Person> getAllUsers() {
        return userRepository.findAll();
    }

    public Person getUserDetails(String username) {
        Optional<Person> person = userRepository.findUserByUsername(username);
        if (person.isPresent()) {
            Person p = person.get();
//            p.setPassword(passwordEncoder.);
            return person.get();
        } else throw new IllegalStateException("user doesn't exists!");
    }

    public Person modifyPerson(String username, Person person) {
        Optional<Person> user = userRepository.findUserByUsername(username);
        if (user.isPresent()) {
            if (person.getFirstname().length() > 0) user.get().setFirstname(person.getFirstname());
            if (person.getLastname().length() > 0) user.get().setLastname(person.getLastname());
            if (person.getPassword().length() > 0) {
                if (!passwordEncoder.matches(person.getPassword(), user.get().getPassword())&&person.getPassword().length()<=20)
                    user.get().setPassword(passwordEncoder.encode(person.getPassword()));
            }

            if (person.getContact().getEmail().length() > 0)
                user.get().getContact().setEmail(person.getContact().getEmail());
            if (person.getContact().getMobileNo() > 0)
                user.get().getContact().setMobileNo(person.getContact().getMobileNo());

            if (person.getContact().getAddress().getAddressLine().length() > 0)
                user.get().getContact().getAddress().setAddressLine(person.getContact().getAddress().getAddressLine());
            if (person.getContact().getAddress().getCity().length() > 0)
                user.get().getContact().getAddress().setCity(person.getContact().getAddress().getCity());
            if (person.getContact().getAddress().getState().length() > 0)
                user.get().getContact().getAddress().setState(person.getContact().getAddress().getState());
            if (person.getContact().getAddress().getCountry().length() > 0)
                user.get().getContact().getAddress().setCountry(person.getContact().getAddress().getCountry());
            if (person.getContact().getAddress().getType().length() > 0)
                user.get().getContact().getAddress().setType(person.getContact().getAddress().getType());
            if (person.getContact().getAddress().getZipCode() > 0)
                user.get().getContact().getAddress().setZipCode(person.getContact().getAddress().getZipCode());

            return user.get();
        } else throw new IllegalStateException("user doesn't exists!");
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}

