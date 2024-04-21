package com.example.hack_2024_donstu.controller;

import com.example.hack_2024_donstu.config.UnauthorizedException;
import com.example.hack_2024_donstu.entity.TeamEntity;
import com.example.hack_2024_donstu.service.TeamService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationController {
    @Autowired
    private TeamService teamService;

    @Transactional
    @PostMapping("teams/login")
    public TeamEntity login(@RequestBody TeamEntity teamEntity) {
        String login = teamEntity.getLogin();
        String password = teamEntity.getPassword();

        TeamEntity storedTeamEntity = teamService.findByLogin(login);
        if (storedTeamEntity != null && storedTeamEntity.getPassword().equals(password)) {
            // Если аутентификация успешна, вернуть список всех команд
            return storedTeamEntity;
        } else {
            throw new UnauthorizedException("Неверный логин или пароль");
        }
    }
}
