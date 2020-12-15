package com.example.controller;

import com.example.document.User;
import com.example.repository.UserRepository;
import com.example.security.CookieUtil;
import com.example.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    private static final String jwtTokenCookieName = "JWT-TOKEN";
    private static final String signingKey = "signingKey";
    private UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public ResponseEntity<String> login(){
        return ResponseEntity.ok("Login");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> login(HttpServletResponse httpServletResponse, @RequestBody User inputUser){
        List<User> userList = userRepository.findAll();
        String email = inputUser.getEmail();
        String password = inputUser.getPassword();
        HashMap<String, String> credentials = new HashMap<>();
        for(int i = 0; i < userList.size(); i++){
            User user = userList.get(i);
            credentials.put(user.getEmail(), user.getPassword());
        }
        if (email == null || !credentials.containsKey(email) || !credentials.get(email).equals(password)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        for(int i = 0; i < userList.size(); i++){
            User user = userList.get(i);
            if(user.getEmail().equals(email) && user.getPassword().equals(password)){
                inputUser.setId(user.getId());
                break;
            }
        }
        String token = JwtUtil.generateToken(signingKey, email);
        CookieUtil.create(httpServletResponse, jwtTokenCookieName, token, false, -1, "localhost");
        return ResponseEntity.ok(inputUser);
    }
}
