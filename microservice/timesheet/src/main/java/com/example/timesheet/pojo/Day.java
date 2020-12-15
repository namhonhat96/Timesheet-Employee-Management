package com.example.timesheet.pojo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Day {
    public Day(String startTime, String endTime, Integer totalHours, Boolean floating, Boolean vacation, Boolean holiday) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalHours = totalHours;
        this.floating = floating;
        this.vacation = vacation;
        this.holiday = holiday;
    }

    String day;
    String date;
    String startTime;
    String endTime;
    Integer totalHours;
    Boolean floating;
    Boolean vacation;
    Boolean holiday;
}
