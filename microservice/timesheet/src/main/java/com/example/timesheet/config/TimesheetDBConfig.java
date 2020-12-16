package com.example.timesheet.config;
import com.example.timesheet.Domain.Day;
import com.example.timesheet.Domain.Timesheet;
import com.example.timesheet.Repository.TimesheetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Timesheet.class)
@Configuration
public class TimesheetDBConfig {
    @Bean("timesheet")
    CommandLineRunner commandLineRunner(TimesheetRepository timesheetRepository) {
        return strings -> {
            List<Day> days = initializeDayList1();
            //Initialize timesheet summary for user 1
            //timesheetRepository.save(new Timesheet(1, 1, ));
        };
    }

    public List<Day> initializeDayList1(){
        List<Day> dayList1 = new ArrayList<>();
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
