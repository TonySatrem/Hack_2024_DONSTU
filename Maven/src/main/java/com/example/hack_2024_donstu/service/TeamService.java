package com.example.hack_2024_donstu.service;

import com.example.hack_2024_donstu.entity.TeamEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hack_2024_donstu.repositories.TeamRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;

@Service
public class TeamService implements UserDetailsService{

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TeamEntity teamEntity = teamRepository.findByLogin(username);
        if (teamEntity == null) {
            throw new UsernameNotFoundException("Пользователь с именем пользователя не найден: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                teamEntity.getLogin(), teamEntity.getPassword(), new ArrayList<>());
    }

    public TeamEntity registerTeam(TeamEntity teamEntity) {
        if (teamRepository.findByLogin(teamEntity.getLogin()) != null) {
            throw new RuntimeException("Пользователь с логином " + teamEntity.getLogin() + " already exists");
        }
        return teamRepository.save(teamEntity);
    }

    public TeamEntity findByLogin(String login) {
        return teamRepository.findByLogin(login);
    }
}
