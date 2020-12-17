package com.example.timesheet.Controller;

import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.Domain.Template;
import com.example.timesheet.Domain.Timesheet;

import com.example.timesheet.repository.HolidaysRepository;
import com.example.timesheet.repository.TimesheetRepository;
import com.example.timesheet.repository.TemplateRepository;
import org.bouncycastle.util.Times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    private TimesheetRepository timesheetRepo;

    @Autowired
    HolidaysRepository holidaysRepository;

    @Autowired
    private TemplateRepository templateRepository;


    @GetMapping("/test")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("timesheet works");
    }

    // list the summary the week
    @GetMapping("/summary")
    public List<Timesheet> getListOfTimesheet(@RequestParam Integer userId) {
        List<Timesheet> list = timesheetRepo.findAllByUserId(userId);
        if (list == null) {
            System.out.println("empty list");
        }
        // List<Timesheet> list = new ArrayList<>();
        System.out.println(list);
        return list;
    }

    @GetMapping("/week")
    public Timesheet getOneTimesheet(@RequestParam Integer userId, @RequestParam String weekEnding) {
        return timesheetRepo.findByUserIdAndWeekEnding(userId, weekEnding);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTimesheet(@RequestBody Timesheet timesheet) {
        timesheetRepo.save(timesheet);
        return ResponseEntity.ok("Add timesheet");
    }

    @PutMapping("/updateTimesheet")
    public ResponseEntity<String> updateTimesheet(@RequestBody Timesheet timesheet) {
        Timesheet original = timesheetRepo.findByUserIdAndWeekEnding(timesheet.getUserId(),timesheet.getWeekEnding());
        original.setDays(timesheet.getDays());
        original.setComment(timesheet.getComment());
        original.setApprovalStatus(timesheet.getApprovalStatus());
        original.setSubmissionStatus(timesheet.getSubmissionStatus());
        original.setTotalBillingHour(timesheet.getTotalBillingHour());
        original.setTotalCompensatedHour(timesheet.getTotalCompensatedHour());
        timesheetRepo.save(original);
        return ResponseEntity.ok("Update timesheet");
    }

    @PutMapping("/updateDefault")
    public ResponseEntity<String> updateTemplate(@RequestBody Template template){
        Template original = templateRepository.findByUserId(template.getUserId());
        original.setDays(template.getDays());
        templateRepository.save(original);
        return ResponseEntity.ok("Update timesheet");
    }

    @GetMapping("/holiday")
    public Holidays getHolidays() {
        Holidays holidays = holidaysRepository.findByYear(2020);
        if (holidays == null) {
            System.out.println("null");
        }
        return holidays;
    }
}
