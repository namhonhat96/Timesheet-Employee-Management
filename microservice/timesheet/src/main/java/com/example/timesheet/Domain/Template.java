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
@Document(collation = "template")
public class Template {
    @Id
    private String id;
    private String userId;
    private List<Day> days;

    public Template() {
        
    }
}
