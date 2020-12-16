package com.example.timesheet.Controller;

import com.example.timesheet.Domain.Timesheet;
import com.example.timesheet.Repository.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    private TimesheetRepository timesheetRepo;

    @GetMapping("/test")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("timesheet works");
    }

    //list the summary the week
    @GetMapping("/summary")
    public List<Timesheet> getListOfTimesheet(@RequestParam String userId){
        List<Timesheet> list = timesheetRepo.findAllByUserId(userId);
        if(list == null){
            System.out.println("empty list");
        }
//        List<Timesheet> list = new ArrayList<>();
        System.out.println(list);
        return list;
    }

    @GetMapping("/week")
    public Timesheet getOneTimesheet(@RequestParam String userId, @RequestParam String weekEnding){
        return timesheetRepo.findByUserIdAndWeekEnding(userId, weekEnding);
    }


    @PostMapping("/add")
    public ResponseEntity<String> addTimesheet(@RequestBody Timesheet timesheet){
//        Timesheet timesheet = new Timesheet();
//        timesheet.setUserId("123");
//        timesheet.setSubmissionStatus(1);
//        timesheet.setApprovalStatus(2);
        timesheetRepo.save(timesheet);
        return ResponseEntity.ok("Add timesheet");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTimesheet(@RequestBody Timesheet timesheet){
//        Timesheet timesheet = timesheetRepo.findByUserIdAndWeekEnding("12","12");
//        timesheet.setSubmissionStatus(1);
//        timesheet.setApprovalStatus(2);
//        timesheet.setComment("New update");
        timesheetRepo.save(timesheet);
        return ResponseEntity.ok("Update timesheet");
    }

}
