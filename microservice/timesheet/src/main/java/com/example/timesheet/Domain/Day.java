package com.example.timesheet.Domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Day {
    public Day(String startTime, String endTime, Double totalHours, Boolean floating, Boolean vacation,
            Boolean holiday) {
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
    Double totalHours;
    Boolean floating;
    Boolean vacation;
    Boolean holiday;
}
