package com.example.contact.repository;

import com.example.contact.document.EContact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EContactRepository extends MongoRepository<EContact, Integer> {
    EContact findEContactByPersonID(Integer personId);

    EContact findEContactByName1(String name1);
}
