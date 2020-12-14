package com.example.contact.controller;

import com.example.contact.document.Contact;
import com.example.contact.document.EContact;
import com.example.contact.repository.ContactRepository;
import com.example.contact.repository.EContactRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/econtact")
public class EContactController {
    private EContactRepository eContactRepository;

    public EContactController(EContactRepository eContactRepository){
        this.eContactRepository = eContactRepository;
    }

    @GetMapping("/{id}")
    public EContact findEContactById(@PathVariable("id") Integer id){
        return this.eContactRepository.findEContactById(id);
    }
}
