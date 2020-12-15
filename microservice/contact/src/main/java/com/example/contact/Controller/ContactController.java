package com.example.contact.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @GetMapping("/test")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("contact works");
    }
}