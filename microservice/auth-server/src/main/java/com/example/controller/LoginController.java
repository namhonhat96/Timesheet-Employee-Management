package com.example.controller;

import com.example.security.CookieUtil;
import com.example.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    private static final String jwtTokenCookieName = "JWT-TOKEN";
    private static final String signingKey = "signingKey";
    private static final Map<String, String> credentials = new HashMap<>();

    public LoginController() {
        credentials.put("admin@admin.com", "admin");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(){

        System.out.println("------");
        return ResponseEntity.ok("Login");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletResponse httpServletResponse, String username, String password, String redirect, Model model){

        if (username == null || !credentials.containsKey(username) || !credentials.get(username).equals(password)){
            model.addAttribute("error", "Invalid username or password!");
            return ResponseEntity.ok("Login");
        }
        String token = JwtUtil.generateToken(signingKey, username);
        CookieUtil.create(httpServletResponse, jwtTokenCookieName, token, false, -1, "localhost");
        return ResponseEntity.ok("login success");
    }
}
