package com.example.contact;

import com.example.contact.repository.AddressRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = AddressRepository.class)
@EnableEurekaClient
public class ContactApplication {
	public static void main(String[] args) {
		SpringApplication.run(ContactApplication.class, args);
	}

}
