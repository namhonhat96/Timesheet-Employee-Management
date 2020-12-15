package com.example.contact.config;

import com.example.contact.document.Address;
import com.example.contact.repository.AddressRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = Address.class)
@Configuration
public class AddressDBConfig {
    @Bean("address")
    CommandLineRunner commandLineRunner(AddressRepository addressRepository) {
        return strings -> {
            addressRepository.save(new Address(1, "123 Rosevelt Street, Princeton, New Jersey, 12456"));
        };
    }
}

