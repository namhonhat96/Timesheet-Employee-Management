package com.example.contact.resource;

import com.example.contact.document.Contact;
import com.example.contact.document.EContact;
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
    public EContact findEContactById(@PathVariable("id") Integer personId){
        return this.eContactRepository.findEContactByPersonID(personId);
    }

    @PostMapping("update")
    public void updateTestByID(@RequestBody EContact eContact){
        EContact validateEContact = this.eContactRepository.findEContactByName1(eContact.getName1());
        System.out.println("EContact ID:" + eContact.getId());
        if(validateEContact != null){
            this.eContactRepository.delete(validateEContact);
            this.eContactRepository.save(eContact);
        }else{
            System.out.println("EContact Record Not Found");
        }
    }
}
