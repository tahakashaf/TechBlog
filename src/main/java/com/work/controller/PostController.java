package com.work.controller;

import com.work.models.Post;
import com.work.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@Controller
public class PostController {


    @Autowired
    private PostService postService;
    @RequestMapping("posts")
    public String getUserPosts(Model model){
        ArrayList<Post> posts = postService.getOnePost();
        //added in request scope
        model.addAttribute("posts",posts);
        return "posts";
    }


    @RequestMapping("/posts/newpost")
    public String newPost() {
        return "posts/create";
    }

    @RequestMapping(value = "/posts/create", method = RequestMethod.POST)
    public String createPost(Post newPost) {
        postService.createPost(newPost);
        return "redirect:/posts";
    }
}
