package se.logbook.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.logbook.backend.model.Trip;
import se.logbook.backend.repository.TripRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
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