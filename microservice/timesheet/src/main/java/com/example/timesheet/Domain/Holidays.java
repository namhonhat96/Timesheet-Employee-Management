package com.example.timesheet.Domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "holidays")
public class Holidays {
    @Id
    private Integer id;
    private Integer year;

    private List<String> holiday;
}
