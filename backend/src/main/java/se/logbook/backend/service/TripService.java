package se.logbook.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import se.logbook.backend.model.Trip;
import se.logbook.backend.model.User;
import se.logbook.backend.repository.CarRepository;
import se.logbook.backend.repository.TripRepository;
import se.logbook.backend.repository.UserRepository;
import se.logbook.backend.model.Car;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Användare hittades inte"));
    }

    public List<Trip> getAllTrips() {
        List<Car> userCars = carRepository.findByUserId(getCurrentUser().getId());
        return userCars.stream()
                .flatMap(car -> tripRepository.findByCarId(car.getId()).stream())
                .collect(java.util.stream.Collectors.toList());
    }

    public List<Trip> getTripsByCarId(Long carId) {
        return tripRepository.findByCarId(carId);
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}