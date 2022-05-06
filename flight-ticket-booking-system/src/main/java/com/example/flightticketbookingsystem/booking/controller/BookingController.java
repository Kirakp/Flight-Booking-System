package com.example.flightticketbookingsystem.booking.controller;

import com.example.flightticketbookingsystem.booking.model.Booking;
import com.example.flightticketbookingsystem.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/get_users_booking")
    public ResponseEntity<List<Booking>> bookingsOfUser(@RequestParam() String username){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/booking/get_users_booking").toUriString());
        return ResponseEntity.created(uri).body(bookingService.bookingsOfUser(username));
    }

    @PostMapping("/add_booking")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/booking/add_booking").toUriString());
        System.out.println(booking);
        return ResponseEntity.created(uri).body(bookingService.addBooking(booking));
    }

    @DeleteMapping("/cancel_booking")
    public void cancelBooking(@RequestParam("id") Integer id){
//        System.out.println();
        bookingService.cancelBooking(id);
    }
}
