package com.example.timesheet.Controller;

import com.example.timesheet.Domain.Holidays;
import com.example.timesheet.Domain.PTO;
import com.example.timesheet.Domain.Template;
import com.example.timesheet.Domain.Timesheet;

import com.example.timesheet.Repository.HolidaysRepository;
import com.example.timesheet.Repository.PTORepository;
import com.example.timesheet.Repository.TimesheetRepository;
import com.example.timesheet.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    private TimesheetRepository timesheetRepo;

    @Autowired
    private HolidaysRepository holidaysRepository;

    @Autowired
    private PTORepository ptoRepository;

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
        Timesheet timesheet1 = new Timesheet();
        timesheet.setId(111);
        timesheet.setUserId(123);

        timesheetRepo.save(timesheet);
        return ResponseEntity.ok("Add timesheet");
    }

    @PutMapping("/updateTimesheet")
    public ResponseEntity<String> updateTimesheet(@RequestBody Timesheet timesheet) {
        Timesheet original = timesheetRepo.findByUserIdAndWeekEnding(timesheet.getUserId(),timesheet.getWeekEnding());
        original.setTotalCompensatedHour(timesheet.getTotalCompensatedHour());
        original.setTotalBillingHour(timesheet.getTotalBillingHour());
        original.setTotalCompensatedHour(timesheet.getTotalCompensatedHour());
        original.setSubmissionStatus(timesheet.getSubmissionStatus());
        original.setApprovalStatus(timesheet.getApprovalStatus());
        original.setDays(timesheet.getDays());
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

    @GetMapping("/pto")
    public PTO findByUserIdAndYear(@RequestBody PTO pto){
        PTO checkPto = ptoRepository.findByUserIdAndYear(pto.getId(), pto.getYear());
        if(checkPto == null){
            System.out.println("No PTO found");
        }
        return checkPto;
    }

    @PostMapping("/update-floating")
    public void updateFloating(@RequestBody PTO pto){
        PTO checkPTO = ptoRepository.findByUserIdAndYear(pto.getUserId(), pto.getYear());
        if(checkPTO != null){
            if(checkPTO.getFloatingCount() > 0){
                checkPTO.setFloatingCount(checkPTO.getFloatingCount()-1);
                ptoRepository.delete(pto); //remove the old document
                ptoRepository.save(checkPTO); //save the new document
                //Update the floating day left on Summary comment
            }else{
                System.out.println("No more floating day");
            }
        }else{
            System.out.println("No PTO Floating day found");
            //Create a new PTO floating day document for that year
            Random random = new Random();
            int id = random.nextInt(100);
            pto.setId(id);
            pto.setUserId(pto.getUserId());
            pto.setFloatingCount(2); //use one floating day
            pto.setVacationCount(3);
        }
    }

    @PostMapping("/update-vacation")
    public void updateVacation(@RequestBody PTO pto){
        PTO checkVacation = ptoRepository.findByUserIdAndYear(pto.getUserId(), pto.getYear());
        if(checkVacation != null){
            if(checkVacation.getVacationCount() > 0){
                checkVacation.setVacationCount(checkVacation.getVacationCount()- 1);
                ptoRepository.delete(pto);
                ptoRepository.save(checkVacation);
            }else{
                System.out.println("No more vacation day left");
            }
        }else{
            System.out.println("No PTO vacation found");
            Random random = new Random();
            int id = random.nextInt(100);
            pto.setId(id);
            pto.setUserId(pto.getUserId());
            pto.setFloatingCount(3);
            pto.setVacationCount(2);//use one vacation day
        }
        pto.setFloatingCount(pto.getFloatingCount()-1);
        ptoRepository.save(pto);
    }
}
