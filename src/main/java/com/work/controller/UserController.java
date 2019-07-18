package com.work.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {


    @RequestMapping("users/login")
    public String login(){

        return "users/login";
    }

    @RequestMapping("users/registration")
    public String registration(){

        return "users/registration";
    }
}
