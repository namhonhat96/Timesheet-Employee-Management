package com.example.timesheet.config;
import com.example.timesheet.Domain.Day;
import com.example.timesheet.Domain.Timesheet;

import com.example.timesheet.repository.TemplateRepository;
import com.example.timesheet.repository.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Timesheet.class)
@Configuration
public class TimesheetDBConfig {
    @Autowired
    TemplateRepository templateRepository;

    @Bean("timesheet")
    CommandLineRunner commandLineRunner(TimesheetRepository timesheetRepository) {
        return strings -> {
            List<Day> days = initializeDayList1(1);
            //Initialize timesheet summary for user 1
            timesheetRepository.save(new Timesheet(1, 1, "12/26/2020", 32, 40, 0, 0, "", days));
        };
    }

    public List<Day> initializeDayList1(Integer userId){

        List<Day> dayList1 = templateRepository.findByUserId(userId).getDays();
        return dayList1;
    }

    public List<Day> initializeDayList2(){
        List<Day> dayList2 = new ArrayList<>();
        return dayList2;
    }
}


/*
    private String id;
    private String userId;
    private String weekEnding;
    private Integer totalBillingHour;
    private Integer totalCompensatedHour;
    private Integer submissionStatus;
    private Integer approvalStatus;
    private String comment;
    private List<Day> days;
 */
