package com.work.controller;


import com.work.models.Post;
import com.work.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Date;

@Controller
public class HomeController  {


    public  HomeController(){

        System.out.println("***HOME CONTROLLER***");
    }
    @Autowired
    private PostService postService;

    @RequestMapping("/")
    public String getAllPosts(Model model){

        ArrayList<Post> posts=postService.getAllPosts();
        model.addAttribute("posts",posts);
        return "index";


    }
}
