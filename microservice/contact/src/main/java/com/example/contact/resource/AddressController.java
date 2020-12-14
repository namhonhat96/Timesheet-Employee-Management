package com.example.contact.resource;

import com.example.contact.document.Address;
import com.example.contact.repository.AddressRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/address")
public class AddressController {
    private AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }

    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable("id") Integer id){
        return this.addressRepository.findAddressById(id);
    }
}
