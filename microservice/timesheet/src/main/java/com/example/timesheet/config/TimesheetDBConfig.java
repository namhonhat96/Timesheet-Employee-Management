package com.example.timesheet.config;
import com.example.timesheet.Domain.Day;
import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.Domain.Timesheet;

import com.example.timesheet.repository.HolidaysRepository;
import com.example.timesheet.repository.TemplateRepository;
import com.example.timesheet.repository.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = Timesheet.class)
@Configuration
public class TimesheetDBConfig {
    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    HolidaysRepository holidaysRepository;

    @Bean("timesheet")
    CommandLineRunner commandLineRunner(TimesheetRepository timesheetRepository) {
        return strings -> {
            List<Day> days = initializeDayList1(1,"12/26/2020");
            //Initialize timesheet summary for user 1
            timesheetRepository.save(new Timesheet(1, 1, "12/26/2020", 32, 40, 0, 0, "", days));
        };
    }

    public List<Day> initializeDayList1(Integer userId, String weekEnding) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Date weekEndingDate = sdf.parse(weekEnding);
        Calendar ComparedDate = Calendar.getInstance();
        Holidays holidays = holidaysRepository.findByYear(2020);
        if(holidays == null) {
            System.out.println("null");
        }
        List<String> holidaysDates = holidays.getHoliday();
        List<Day> dayList1 = templateRepository.findByUserId(userId).getDays();
        for(int i=0; i<dayList1.size(); i++) {
            if(i==0) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -6);

                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);

                if(holidaysDates.contains(curDate)) {
                    dayList1.get(i).setHoliday(true);
                }
                else {
                    dayList1.get(i).setHoliday(false);
                }
                dayList1.get(i).setDay("Sunday");
            }
            else if(i==1) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -5);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                if(holidaysDates.contains(curDate)) {
                    dayList1.get(i).setHoliday(true);
                }
                else {
                    dayList1.get(i).setHoliday(false);
                }
                dayList1.get(i).setDay("Monday");
            }
            else if(i==2) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -4);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                dayList1.get(i).setDay("Tuesday");
            }
            else if(i==3) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -3);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                dayList1.get(i).setDay("Wednesday");
            }
            else if(i==4) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -2);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                dayList1.get(i).setDay("Thursday");
            }
            else if(i==5) {
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                date.add(Calendar.DAY_OF_YEAR, -1);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                if(holidaysDates.contains(curDate)) {
                    dayList1.get(i).setHoliday(true);
                }
                else {
                    dayList1.get(i).setHoliday(false);
                }
                dayList1.get(i).setDay("Friday");
            }
            else{
                Calendar date = ComparedDate;
                date.setTime(weekEndingDate);
                String curDate = sdf.format(date.getTime());
                dayList1.get(i).setDate(curDate);
                dayList1.get(i).setDay("Saturday");
            }
        }
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
