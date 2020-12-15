package com.example.summary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SummaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SummaryApplication.class, args);
	}

}
