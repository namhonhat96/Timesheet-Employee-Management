package com.example.contact.repository;

import com.example.contact.document.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, Integer> {
    Contact findContactById(Integer id);
    Contact findContactByPhoneNumber(String phoneNumber);
}
