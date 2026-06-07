package se.logbook.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.logbook.backend.model.Car;
import se.logbook.backend.repository.CarRepository;
import java.util.List;

@Service
@RequiredArgsConstructor


public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

}
