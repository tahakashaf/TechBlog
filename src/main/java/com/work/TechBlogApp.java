package com.work;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
//Controller are registered to Spring IOC container by default
public class TechBlogApp  {

    public static void main(String [] args){

        SpringApplication.run(TechBlogApp.class,args);
    }
}
