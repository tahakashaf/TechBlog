
package com.work.service;

import com.work.models.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public boolean login(User user) {
        if(user.getUsername() != null && user.getUsername().equals("validuser")) {
            return true;
        }
        else {
            return false;
        }
    }

}