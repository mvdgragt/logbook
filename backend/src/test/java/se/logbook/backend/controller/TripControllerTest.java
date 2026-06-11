package se.logbook.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import se.logbook.backend.model.AuthRequest;
import se.logbook.backend.model.Car;
import se.logbook.backend.model.Trip;
import se.logbook.backend.service.AuthService;
import se.logbook.backend.service.CarService;
import se.logbook.backend.service.TripService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TripControllerTest {

    @Autowired
    private TripService tripService;

    @Autowired
    private CarService carService;

    @Autowired
    private AuthService authService;

    @BeforeEach
    void setUp() {
        String username = "triptest_" + System.currentTimeMillis();
        AuthRequest request = new AuthRequest();
        request.setUsername(username);
        request.setEmail(username + "@test.se");
        request.setPassword("password123");
        authService.register(request);

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void getAllTrips_ShouldReturnList() {
        List<Trip> trips = tripService.getAllTrips();
        assertNotNull(trips);
    }

    @Test
    void createTrip_ShouldSaveTrip() {
        Car car = new Car();
        car.setMake("Volvo");
        car.setModel("V70");
        car.setLicensePlate("TRIP_" + System.currentTimeMillis());
        Car savedCar = carService.createCar(car);

        Trip trip = new Trip();
        trip.setDate(LocalDate.now());
        trip.setStartLocation("Helsingborg");
        trip.setEndLocation("Malmö");
        trip.setDistance(65.0);
        trip.setPurpose("Jobb");
        trip.setCar(savedCar);

        Trip saved = tripService.createTrip(trip);

        assertNotNull(saved.getId());
        assertEquals("Helsingborg", saved.getStartLocation());
    }

    @Test
    void getTripsByCarId_ShouldReturnTrips() {
        Car car = new Car();
        car.setMake("BMW");
        car.setModel("X5");
        car.setLicensePlate("CAR_" + System.currentTimeMillis());
        Car savedCar = carService.createCar(car);

        Trip trip = new Trip();
        trip.setDate(LocalDate.now());
        trip.setStartLocation("Stockholm");
        trip.setEndLocation("Uppsala");
        trip.setDistance(70.0);
        trip.setPurpose("Privat");
        trip.setCar(savedCar);
        tripService.createTrip(trip);

        List<Trip> trips = tripService.getTripsByCarId(savedCar.getId());
        assertFalse(trips.isEmpty());
    }
}