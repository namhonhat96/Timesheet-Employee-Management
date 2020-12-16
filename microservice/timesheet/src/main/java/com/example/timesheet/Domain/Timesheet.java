package com.example.timesheet.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collation = "Timesheet")
public class Timesheet {
    @Id
    private String id;

    private String userId;
    private String weekEnding;
    private Integer totalBillingHour;
    private Integer totalCompensatedHour;
    private Integer submissionStatus;
    private Integer approvalStatus;
    private String comment;

    private List<Day> days;



}
