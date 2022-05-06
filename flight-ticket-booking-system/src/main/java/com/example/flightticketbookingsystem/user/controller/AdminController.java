package com.example.flightticketbookingsystem.user.controller;

import com.example.flightticketbookingsystem.user.model.Person;
import com.example.flightticketbookingsystem.user.service.AdminService;
import com.example.flightticketbookingsystem.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<Person> registerNewAdmin(@RequestBody Person person) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/admin/register").toUriString());

        return ResponseEntity.created(uri).body(adminService.registerAdmin(person));
    }
}
