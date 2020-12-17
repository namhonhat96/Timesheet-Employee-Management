package com.example.contact.resource;

import com.example.contact.document.Address;
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

    @PostMapping("update")
    public void updateTestByID(@RequestBody Contact contact){
        Contact validateContact = this.contactRepository.findContactById(contact.getId());
        contact.setAddressId(1);
        contact.setEContactId(1);
        if(validateContact != null){
            this.contactRepository.delete(validateContact);
            this.contactRepository.save(contact);
        }else{
            System.out.println("Contact Record Not Found");
        }
    }
}
