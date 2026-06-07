package se.logbook.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.logbook.backend.model.Trip;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByCarId(Long carId);
}