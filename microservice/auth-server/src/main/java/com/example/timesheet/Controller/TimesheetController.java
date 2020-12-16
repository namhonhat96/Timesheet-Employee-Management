package com.example.timesheet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @GetMapping("/test")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("timesheet works");
    }


}
