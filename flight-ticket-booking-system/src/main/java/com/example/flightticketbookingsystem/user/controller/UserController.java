package com.example.flightticketbookingsystem.user.controller;

import com.example.flightticketbookingsystem.user.model.Person;
import com.example.flightticketbookingsystem.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
//@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Person>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/user/get_details")
    public ResponseEntity<Person> getUserDetails(@RequestParam(value = "username") String username) {
        return ResponseEntity.ok().body(userService.getUserDetails(username));
    }

    @PostMapping("/user/register")
    public ResponseEntity<Person> registerUser(@RequestBody Person person) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/register").toUriString());
        return ResponseEntity.created(uri).body(userService.registerUser(person));
    }

    @PutMapping("/user/modify_details")
    public ResponseEntity<Person> modifyUser(
            @RequestParam(value = "username") String username,
            @RequestBody Person person) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/register").toUriString());
        return ResponseEntity.created(uri).body(userService.modifyPerson(username, person));
    }

    public void deleteUser(@RequestParam Integer id){
        userService.deleteUser(id);
    }


}
