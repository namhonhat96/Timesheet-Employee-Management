package com.example.contact.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "contact")
public class Contact {
    @Id
    private Integer id;
    private String phoneNumber;
    private String email;
    private Integer addressId;
    private Integer eContactId;
}
