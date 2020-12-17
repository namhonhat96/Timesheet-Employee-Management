package com.example.timesheet.Repository;

import com.example.timesheet.Domain.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TimesheetRepository extends MongoRepository<Timesheet, String> {
    List<Timesheet> findAllByUserId(Integer userId);
    Timesheet findByUserIdAndWeekEnding(Integer userId, String weekEnding);
}
