package com.example.timesheet.config;

import com.example.timesheet.Domain.Day;
import com.example.timesheet.Domain.Template;
import com.example.timesheet.repository.TemplateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Template.class)
@Configuration
public class TemplateDBConfig {
    @Bean("template")
    CommandLineRunner commandLineRunner(TemplateRepository templateRepository) {
        return strings -> {
            templateRepository.deleteAll();
            List<Day> days = initializeDayList1();
            templateRepository.save(new Template(1, 1, days));
            templateRepository.save(new Template(2, 2, days));
        };
    }

    public List<Day> initializeDayList1(){
        List<Day> dayList1 = new ArrayList<>();
        for(int i = 0; i < 7; i++){
            if (i > 0 && i < 6){
                Day weekday = new Day("9:00","18:00",9.0,false,false,false);
                dayList1.add(weekday);
            }
            else {
                Day weekend = new Day("N/A", "N/A", 0.0, false, false, false);
                dayList1.add(weekend);
            }
        }
        return dayList1;
    }
}
