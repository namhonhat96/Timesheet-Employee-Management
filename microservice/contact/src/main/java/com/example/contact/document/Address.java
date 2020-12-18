package com.example.contact.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "address")
public class Address {
    @Id
    private Integer id;
    private String homeAddress;

}
