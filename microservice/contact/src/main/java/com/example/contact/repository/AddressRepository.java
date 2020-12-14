package com.example.contact.repository;

import com.example.contact.document.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddressRepository extends MongoRepository<Address, Integer> {
    Address findAddressById(Integer id);
}
