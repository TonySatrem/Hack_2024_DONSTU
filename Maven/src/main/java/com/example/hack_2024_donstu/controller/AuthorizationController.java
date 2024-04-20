package com.example.hack_2024_donstu.controller;

import com.example.hack_2024_donstu.config.UnauthorizedException;
import com.example.hack_2024_donstu.entity.TeamEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.hack_2024_donstu.service.TeamService;

@RestController
public class AuthorizationController {
    @Autowired
    private TeamService teamService;

    @PostMapping("/login")
    public TeamEntity login(@RequestBody TeamEntity teamEntity) {
        String login = teamEntity.getLogin();
        String password = teamEntity.getPassword();

        TeamEntity storedTeamEntity = teamService.findByLogin(login);
        if (storedTeamEntity != null && teamEntity.getPassword().equals(password)) {
            return teamEntity;
        } else {
            throw new UnauthorizedException("Неверный логин или пароль");
        }
    }
}
