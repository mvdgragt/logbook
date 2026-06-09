package se.logbook.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.logbook.backend.model.Car;
import se.logbook.backend.model.Trip;
import se.logbook.backend.service.CarService;
import se.logbook.backend.service.TripService;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TripControllerTest {

    @Autowired
    private TripService tripService;

    @Autowired
    private CarService carService;

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
        car.setLicensePlate("TRIP001");
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
        assertEquals("Malmö", saved.getEndLocation());
    }

    @Test
    void getTripsByCarId_ShouldReturnTrips() {
        Car car = new Car();
        car.setMake("BMW");
        car.setModel("X5");
        car.setLicensePlate("CAR002");
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