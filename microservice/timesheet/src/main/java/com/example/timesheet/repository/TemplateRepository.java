package com.example.timesheet.repository;

import com.example.timesheet.pojo.Template;
import com.example.timesheet.pojo.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepository extends MongoRepository<Timesheet, Integer>  {
    Template findAllByUserI(Integer userId);
    Template findByWeekending (String weekending);
}
