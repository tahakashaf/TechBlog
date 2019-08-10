package com.work.controller;


import com.sun.org.apache.bcel.internal.generic.MONITORENTER;
import com.work.models.Post;
import com.work.models.User;
import com.work.service.PostService;
import com.work.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@Controller
public class UserController {

     @Autowired
     private PostService postService;
     @Autowired
     private UserService userService;
    @RequestMapping("users/login")
    public String login(){

        return "users/login";
    }

    @RequestMapping("users/registration")
    public String registration() {
        return "users/registration";
    }
    @RequestMapping(value = "users/registration", method=RequestMethod.POST)
    public String registerUser(User user) {
        return "users/login";
    }


    @RequestMapping(value = "users/login",method = RequestMethod.POST)
    public String loginUser(User user){

        if(userService.login(user)) {
            return "redirect:/posts";
        }
        else {
            return "users/login";
        }


        //return "redirect:/posts";

    }

    @RequestMapping(value ="users/logout",method = RequestMethod.POST)
    public  String logout(Model model){
        ArrayList<Post> allPosts = postService.getAllPosts();
        model.addAttribute("posts",allPosts);
        return "index";

    }
}
