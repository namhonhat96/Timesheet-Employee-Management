package com.example.contact.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "econtact")
public class EContact {
    @Id
    private Integer id;
    private String name1;
    private String phoneNumber1;

    private String name2;
    private String phoneNumber2;
}
