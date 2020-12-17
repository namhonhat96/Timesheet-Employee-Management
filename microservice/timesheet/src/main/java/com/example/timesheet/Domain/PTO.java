package com.example.timesheet.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "PTO")
public class PTO {
    @Id
    private Integer id;

    private Integer userId;
    private Integer year;
    private Integer floatingCount;
    private Integer vacationCount;
}
