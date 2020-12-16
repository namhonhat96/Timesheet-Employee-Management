package com.example.timesheet.Repository;

import com.example.timesheet.Domain.Template;
import com.example.timesheet.Domain.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TimesheetRepository extends MongoRepository<Timesheet, Integer> {
    Timesheet findByUserId(Integer userId);
}
