package com.example.contact.config;

import com.example.contact.document.Address;
import com.example.contact.document.Contact;
import com.example.contact.repository.AddressRepository;
import com.example.contact.repository.ContactRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = Contact.class)
@Configuration
public class ContactDBConfig {

    @Bean("contact")
    CommandLineRunner commandLineRunner(ContactRepository contactRepository) {
        return strings -> {
            contactRepository.save(new Contact(1, "456-789-1122", "user1@gmail.com", 1, 1));
            contactRepository.save(new Contact(2, "213-789-1122", "user2@gmail.com", 2, 2));
        };
    }
}
