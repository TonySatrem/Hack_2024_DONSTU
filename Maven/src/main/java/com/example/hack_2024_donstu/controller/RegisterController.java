package com.example.hack_2024_donstu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.hack_2024_donstu.service.TeamService;
import com.example.hack_2024_donstu.entity.TeamEntity;

@RestController
public class RegisterController {
    @Autowired
    private TeamService teamService;

    @PostMapping("/register")
    public TeamEntity registerUser(@RequestBody TeamEntity teamEntity) {
        return teamService.registerTeam(teamEntity);
    }
}
