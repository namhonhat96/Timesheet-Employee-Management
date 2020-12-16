package com.example.timesheet.config;

import com.example.timesheet.Domain.Day;
import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.Domain.Template;
import com.example.timesheet.repository.HolidaysRepository;
import com.example.timesheet.repository.TemplateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Holidays.class)
@Configuration
public class HolidaysDBConfig {
    @Bean("holidays")
    CommandLineRunner commandLineRunner(HolidaysRepository holidaysRepository) {
        return strings -> {
            List<String> holidays = initializeHolidaysList();
//            templateRepository.save(new Template(1, 1, days));
//            templateRepository.save(new Template(2, 2, days));
//            holidaysRepository.save("1", 2020, );

        };
    }

    public List<String> initializeHolidaysList(){

        List<String> holidaysList = Arrays.asList( "alex", "brian", "charles");

        return holidaysList;
    }
}
