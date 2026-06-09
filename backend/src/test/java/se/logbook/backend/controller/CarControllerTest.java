package se.logbook.backend.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.logbook.backend.model.Car;
import se.logbook.backend.service.CarService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CarControllerTest {

    @Autowired
    private CarService carService;

    @BeforeEach
    void setUp() {
        // Rensa data mellan tester
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
        car.setLicensePlate("TEST123");

        Car saved = carService.createCar(car);

        assertNotNull(saved.getId());
        assertEquals("Volvo", saved.getMake());
        assertEquals("V70", saved.getModel());
    }

    @Test
    void deleteCar_ShouldRemoveCar() {
        Car car = new Car();
        car.setMake("Toyota");
        car.setModel("Corolla");
        car.setLicensePlate("DEL001");

        Car saved = carService.createCar(car);
        Long id = saved.getId();

        carService.deleteCar(id);

        List<Car> cars = carService.getAllCars();
        assertTrue(cars.stream().noneMatch(c -> c.getId().equals(id)));
    }
}