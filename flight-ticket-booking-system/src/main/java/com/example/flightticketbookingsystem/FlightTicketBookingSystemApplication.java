package com.example.flightticketbookingsystem;

import com.example.flightticketbookingsystem.flight.model.*;
import com.example.flightticketbookingsystem.flight.service.FlightService;
import com.example.flightticketbookingsystem.flight.service.LocationService;
import com.example.flightticketbookingsystem.user.model.Address;
import com.example.flightticketbookingsystem.user.model.Contact;
import com.example.flightticketbookingsystem.user.model.Person;
import com.example.flightticketbookingsystem.user.service.AdminService;
import com.example.flightticketbookingsystem.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@SpringBootApplication

@CrossOrigin(origins = "*")
public class FlightTicketBookingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlightTicketBookingSystemApplication.class, args);
    }

    @Bean
    CommandLineRunner run(AdminService adminService, LocationService locationService, FlightService flightService) {
        return args -> {
            Address address = new Address(null, "Home", "K.R.Puram", 560036L, "Bangalore", "Karnataka", "India");
            Contact contact = new Contact(null, "admin@gmail.com", 7899424475L, address);
            adminService.registerAdmin(new Person( "admin1234", "This is", "Admin", "password", contact));

            Location location1 = new Location(null, "Visakhapatnam", "Visakhapatnam Airport", "Andra", "India");
            locationService.addLocation(location1);
            Location location2 = new Location(null, "Thoothukudi", "Tuticorin Airport", "TN", "India");
            locationService.addLocation(location2);
            Location location3 = new Location(null, "Pondicherry", "Pondicherry Airport", "Pondicherry", "India");
            locationService.addLocation(location3);
            Location location4 = new Location(null, "Donakonda", "Donakonda Airport", "Andra", "India");
            locationService.addLocation(location4);
            Location location5 = new Location(null, "Bangalore", "Kempegowda International Airport", "BLR", "India");
            locationService.addLocation(location5);
            Location location6 = new Location(null, "Meenambakkam", "Chennai International Airport", "MAA", "India");
            locationService.addLocation(location6);
            Location location7 = new Location(null, "Mattannur", "Kannur International Airport ", "CNN", "India");
            locationService.addLocation(location7);
            Location location8 = new Location(null, "Manglore", "Mangalore International Airport", "IXE", "India");
            locationService.addLocation(location8);
            Location location9 = new Location(null, "Hyderabad", "Rajiv Gandhi International Airport", "HYD", "India");
            locationService.addLocation(location9);
            Location location10 = new Location(null, "Srinagar", "Srinagar International Airport", "SXR", "India");
            locationService.addLocation(location10);
            Location location11 = new Location(null, "Shimla", "Shimla Airport", "SLV", "India");
            locationService.addLocation(location11);
            Location location12 = new Location(null, "Jamshedpur", "Sonari Airport", "IXW", "India");
            locationService.addLocation(location12);
            Location location13 = new Location(null, "Bhopal", "Raja Bhoj Airport", "BHO", "India");
            locationService.addLocation(location13);
            Location location14 = new Location(null, "Mumbai", "Chhatrapati Shivaji Maharaj International Airport", "BOM", "India");
            locationService.addLocation(location14);
            Location location15 = new Location(null, "Amritsar", "Sri Guru Ram Dass Jee International Airport", "ATQ", "India");
            locationService.addLocation(location15);
            Location location16 = new Location(null, "Jaipur", "Jaipur International Airport", "JAI", "India");
            locationService.addLocation(location16);
            Location location17 = new Location(null, "Varanasi", "Lal Bahadur Shastri International Airport", "VNS", "India");
            locationService.addLocation(location17);
            Location location18 = new Location(null, "Dehradun", "Jolly Grant Airport", "DED", "India");
            locationService.addLocation(location18);
            Location location19 = new Location(null, "Kolkata", "Netaji Subhas Chandra Bose International Airport", "CCU", "India");
            locationService.addLocation(location19);
            Location location20 = new Location(null, "Chandigarh", "Chandigarh Airport", "IXC", "India");
            locationService.addLocation(location20);
            Location location21 = new Location(null, "Delhi", "Indira Gandhi International Airport", "DEL", "India");
            locationService.addLocation(location21);
            Location location22 = new Location(null, "Guwahati", "Lokpriya Gopinath Bordoloi International Airport", "GAU", "India");
            locationService.addLocation(location22);
            Location location23 = new Location(null, "Patna", "Jay Prakash Narayan Airport", "PAT", "India");
            locationService.addLocation(location23);
            Location location24 = new Location(null, "Raipur", "Swami Vivekananda Airport", "RPR", "India");
            locationService.addLocation(location24);
            Location location25 = new Location(null, "Ahmedabad", "Sardar Vallabhbhai Patel International Airport", "AMD", "India");
            locationService.addLocation(location25);
            Location location26 = new Location(null, "Hisar", "Hisar Airport", "HSS", "India");
            locationService.addLocation(location26);
            Location location27 = new Location(null, "Imphal", "Imphal International Airport", "IMF", "India");
            locationService.addLocation(location27);
            Location location28 = new Location(null, "Shillong", "Shillong Airport", "SHL", "India");
            locationService.addLocation(location28);
            Location location29 = new Location(null, "Bhubaneswar", "Biju Patnaik International Airport", "BBI", "India");

            Flight flight1 = new Flight(null, "Bangalore", "Mumbai", new Timestamp(122, 5, 3, 22, 52, 0, 0), new Timestamp(122, 5, 3, 00, 25, 0, 0), new Fleet(null, "6E-5344", "IndiGo", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 8000.0, 6000.0, 4000.0));
            flightService.addFlight(flight1);
            Flight flight2 = new Flight(null, "Amritsar", "Jaipur", new Timestamp(122, 5, 6, 19, 35, 0, 0), new Timestamp(122, 5, 6, 21, 10, 0, 0), new Fleet(null, "SG-3764", "SpiceJet", 70.0, 50.0, 100.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 8450.0, 5800.0, 4690.0));
            flightService.addFlight(flight2);
            Flight flight3 = new Flight(null, "Kolkata", "Srinagar", new Timestamp(122, 5, 20, 07, 40, 0, 0), new Timestamp(122, 5, 20, 13, 25, 0, 0), new Fleet(null, "I5-552", "AirAsia", 25.0, 35.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 12000.0, 6950.0, 4800.0));
            flightService.addFlight(flight3);
            Flight flight4 = new Flight(null, "Chandigarh", "Ahmedabad", new Timestamp(122, 6, 10, 18, 55, 0, 0), new Timestamp(122, 6, 10, 01, 50, 0, 0), new Fleet(null, "UK-638", "IndiGo", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 7806.0, 5082.0, 3051.0));
            flightService.addFlight(flight4);
            Flight flight5 = new Flight(null, "Bangalore", "Mumbai", new Timestamp(122, 5, 4, 22, 52, 0, 0), new Timestamp(122, 5, 4, 00, 25, 0, 0), new Fleet(null, "6E-5344", "IndiGo", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 8000.0, 6000.0, 4000.0));
            flightService.addFlight(flight5);
            Flight flight6 = new Flight(null, "Bhopal", "Guwahati", new Timestamp(122, 6, 8, 14, 40, 0, 0), new Timestamp(122, 6, 9, 12, 05, 0, 0), new Fleet(null, "AI-482", "AirIndia", 30.0, 50.0, 100.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 13000.0, 8613.0, 6500.0));
            flightService.addFlight(flight6);
            Flight flight7 = new Flight(null, "Varanasi", "Imphal", new Timestamp(122, 7, 5, 22, 00, 0, 0), new Timestamp(122, 7, 6, 07, 20, 0, 0), new Fleet(null, "6E-2815", "IndiGo", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 10608.0, 6780.0, 4058.0));
            flightService.addFlight(flight7);
            Flight flight8 = new Flight(null, "Raipur", "Shimla", new Timestamp(122, 5, 27, 8, 55, 0, 0), new Timestamp(122, 5, 27, 10, 50, 0, 0), new Fleet(null, "UK-794", "Vistara", 20.0, 50.0, 120.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 6500.0, 4080.0, 3890.0));
            flightService.addFlight(flight8);
            Flight flight9 = new Flight(null, "Shillong", "Bhubaneswar", new Timestamp(122, 6, 22, 03, 52, 0, 0), new Timestamp(122, 6, 22, 10, 00, 0, 0), new Fleet(null, "6E-5344", "IndiGo", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 13000.0, 6500.0, 4080.0));
            flightService.addFlight(flight9);
            Flight flight10 = new Flight(null, "Kolkata", "Raipur", new Timestamp(122, 5, 28, 21, 30, 0, 0), new Timestamp(122, 5, 29, 07, 45, 0, 0), new Fleet(null, "G8-399", "GO FIRST", 20.0, 50.0, 100.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 14525.0, 9853.0, 6851.0));
            flightService.addFlight(flight10);
            Flight flight11 = new Flight(null, "Kolkata", "Pondicherry", new Timestamp(122, 8, 13, 07, 50, 0, 0), new Timestamp(122, 8, 13, 14, 10, 0, 0), new Fleet(null, "SG-3028", "SpiceJet", 30.0, 50.0, 130.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 1213.0, 8954.0, 5786.0));
            flightService.addFlight(flight11);
            Flight flight12 = new Flight(null, "Mangalore", "Hyderabad", new Timestamp(122, 8, 25, 12, 40, 0, 0), new Timestamp(122, 8, 25, 21, 40, 0, 0), new Fleet(null, "AI-680", "AirIndia", 25.0, 30.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 20232.0, 16253.0, 14200.0));
            flightService.addFlight(flight12);
            Flight flight13 = new Flight(null, "Pondicherry", "Visakhapatnam", new Timestamp(122, 7, 3, 10, 15, 0, 0), new Timestamp(122, 7, 3, 22, 10, 0, 0), new Fleet(null, "I5-517", "AirAsia", 50.0, 50.0, 80.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 10998.0, 7283.0, 5258.0));
            flightService.addFlight(flight13);
            Flight flight14 = new Flight(null, "Kolkata", "Bangalore", new Timestamp(122, 5, 10, 21, 15, 0, 0), new Timestamp(122, 5, 10, 22, 55, 0, 0), new Fleet(null, "AI-528", "Ailliance Air", 20.0, 50.0, 100.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 10298.0, 6583.0, 3258.0));
            flightService.addFlight(flight14);
            Flight flight15 = new Flight(null, "Kolkata", "Bangalore",new Date(2022,5,16), new Timestamp(122, 5, 10, 22, 55, 0, 0), new Fleet(null, "AI-528", "Ailliance Air", 20.0, 50.0, 100.0), new FlightStatus(null, 0.0, 0.0, 0.0), new Fare(null, 10298.0, 6583.0, 3258.0));
            flightService.addFlight(flight15);

        };
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
