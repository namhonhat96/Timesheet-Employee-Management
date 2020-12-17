package com.example.timesheet.Repository;

import com.example.timesheet.Domain.PTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PTORepository extends MongoRepository<PTO, String> {
    List<PTO> findAllByUserId(Integer userId);
    PTO findByUserIdAndYear(Integer userId, Integer year);
}
