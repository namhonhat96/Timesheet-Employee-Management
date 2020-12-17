package com.example.timesheet.repository;


import com.example.timesheet.Domain.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepository extends MongoRepository<Template, String> {
    Template findByUserId(Integer userId);
}
