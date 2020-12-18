package com.example.timesheet.config;

import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.Domain.PTO;
import com.example.timesheet.repository.PTORepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@EnableMongoRepositories(basePackageClasses = PTO.class)
@Configuration
public class PTODBConfig {
    @Bean("PTO")
    CommandLineRunner commandLineRunner(PTORepository ptoRepository) {
        return strings -> {
//            ptoRepository.deleteAll();
            PTO pto = new PTO(1, 1, 2020,3,3);
            ptoRepository.save(pto);
        };
    }

}
