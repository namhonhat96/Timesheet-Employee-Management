package com.example.timesheet.pojo;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "timesheet")
public class Timesheet {
    @Id
    private Integer id;

    Integer userId;
    String weekEnding;
    Integer totalBillingHours;
    Integer totalCompensatedHours;
    Boolean submissionStatus;
    Boolean approvalStatus;
    String comment;

    List<Day> days;

}
