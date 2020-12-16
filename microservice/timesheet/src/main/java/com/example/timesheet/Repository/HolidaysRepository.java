package com.example.timesheet.Repository;

import com.example.timesheet.Domain.Holidays;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HolidaysRepository extends MongoRepository<Holidays, String> {
    Holidays findByYear(Integer years);
}
