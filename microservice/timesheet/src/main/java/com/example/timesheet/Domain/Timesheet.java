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
@Document(collection = "timesheet")
public class Timesheet {
    @Id
    private String id;

    private String userId;                  //init
    private String weekEnding;               //init
    private Integer totalBillingHour;        //init
    private Integer totalCompensatedHour;    //init
    private Integer submissionStatus;        //init
    private Integer approvalStatus;          //init
    private String comment;

    private List<Day> days;                  //init template


}
