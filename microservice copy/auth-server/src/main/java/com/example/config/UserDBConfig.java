package com.example.config;

import com.example.document.User;
import com.example.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = User.class)
@Configuration
public class UserDBConfig {

    @Bean("user")
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return strings -> {
            userRepository.save(new User(1, "user1@gmail.com", "123456789"));
        };
    }
}
