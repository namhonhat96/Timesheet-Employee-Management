package com.example.contact.controller;

import com.example.contact.document.Contact;
import com.example.contact.repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/contact")
public class ContactController {
    private ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository){
        this.contactRepository = contactRepository;
    }

    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable("id") Integer id){
        return this.contactRepository.findContactById(id);
    }
}
