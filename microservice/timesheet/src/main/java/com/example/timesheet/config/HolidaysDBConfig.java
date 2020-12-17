package com.example.timesheet.config;

import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.repository.HolidaysRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Arrays;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Holidays.class)
@Configuration
public class HolidaysDBConfig {
    @Bean("holidays")
    CommandLineRunner commandLineRunner(HolidaysRepository holidaysRepository) {
        return strings -> {
            holidaysRepository.deleteAll();
            List<String> holidays = initializeHolidaysList();
            holidaysRepository.save(new Holidays(1, 2020, holidays));
        };
    }

    public List<String> initializeHolidaysList(){

        List<String> holidaysList = Arrays.asList( "01/01/2020",
                "01/20/2020",
                "02/17/2020",
                "04/10/2020",
                "05/25/2020",
                "07/03/2020",
                "09/07/2020",
                "10/12/2020",
                "11/03/2020",
                "11/26/2020",
                "12/25/2020");

        return holidaysList;
    }
}
