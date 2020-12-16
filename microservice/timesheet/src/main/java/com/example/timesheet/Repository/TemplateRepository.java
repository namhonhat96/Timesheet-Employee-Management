package com.example.timesheet.Repository;

import com.example.timesheet.Domain.Template;
import com.example.timesheet.Domain.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepository extends MongoRepository<Template, Integer>  {
    Template findAllByUserI(Integer userId);
    Template findByWeekending (String weekending);
}
