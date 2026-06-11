package se.logbook.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import se.logbook.backend.model.AuthRequest;
import se.logbook.backend.model.Car;
import se.logbook.backend.service.AuthService;
import se.logbook.backend.service.CarService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CarControllerTest {

    @Autowired
    private CarService carService;

    @Autowired
    private AuthService authService;

    @BeforeEach
    void setUp() {
        // Registrera och logga in testanvändare
        String username = "cartest_" + System.currentTimeMillis();
        AuthRequest request = new AuthRequest();
        request.setUsername(username);
        request.setEmail(username + "@test.se");
        request.setPassword("password123");
        authService.register(request);

        // Sätt upp SecurityContext
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void getAllCars_ShouldReturnEmptyList() {
        List<Car> cars = carService.getAllCars();
        assertNotNull(cars);
    }

    @Test
    void createCar_ShouldSaveCar() {
        Car car = new Car();
        car.setMake("Volvo");
        car.setModel("V70");
        car.setLicensePlate("TEST_" + System.currentTimeMillis());

        Car saved = carService.createCar(car);

        assertNotNull(saved.getId());
        assertEquals("Volvo", saved.getMake());
    }

    @Test
    void deleteCar_ShouldRemoveCar() {
        Car car = new Car();
        car.setMake("Toyota");
        car.setModel("Corolla");
        car.setLicensePlate("DEL_" + System.currentTimeMillis());

        Car saved = carService.createCar(car);
        Long id = saved.getId();

        carService.deleteCar(id);

        List<Car> cars = carService.getAllCars();
        assertTrue(cars.stream().noneMatch(c -> c.getId().equals(id)));
    }

    @Test
    void createCar_WithDuplicateLicensePlate_ShouldFail() {
        String plate = "DUP_" + System.currentTimeMillis();

        Car car1 = new Car();
        car1.setMake("Volvo");
        car1.setModel("V70");
        car1.setLicensePlate(plate);
        carService.createCar(car1);

        Car car2 = new Car();
        car2.setMake("BMW");
        car2.setModel("X5");
        car2.setLicensePlate(plate);

        assertThrows(Exception.class, () -> carService.createCar(car2));
    }
}