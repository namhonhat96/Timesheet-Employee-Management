package com.example.timesheet.repository;

import com.example.timesheet.Domain.Holidays;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HolidaysRepository extends MongoRepository<Holidays, String> {
    Holidays findByYear(Integer years);

    //Boolean exists(String date);
//    String findByHoliday(String date);

}
