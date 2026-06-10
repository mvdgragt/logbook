package se.logbook.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import se.logbook.backend.model.Car;
import se.logbook.backend.model.User;
import se.logbook.backend.repository.CarRepository;
import se.logbook.backend.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Användare hittades inte"));
    }

    public List<Car> getAllCars() {
        return carRepository.findByUserId(getCurrentUser().getId());
    }

    public Car createCar(Car car) {
        car.setUser(getCurrentUser());
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}