package com.example.hack_2024_donstu.controller;

import com.example.hack_2024_donstu.entity.TeamEntity;
import com.example.hack_2024_donstu.repositories.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class TeamController {
    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @PostMapping("teams/add")
    public ResponseEntity<String> addTeam(@RequestBody TeamEntity teamEntity) {
        try {
            teamRepository.save(teamEntity);
            return ResponseEntity.ok("Команда успешно добавлена");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении команды: " + e.getMessage());
        }
    }

    @GetMapping("teams/get")
    public ResponseEntity<ArrayList<TeamEntity>> getAllTeams() {
        ArrayList<TeamEntity> teams = (ArrayList<TeamEntity>) teamRepository.findAll();
        return ResponseEntity.ok(teams);
    }

    @DeleteMapping("teams/remove/{id}")
    public ResponseEntity<?> removeTeam(@PathVariable("id") Integer id) {
        try {
            Optional<TeamEntity> teamOptional = teamRepository.findById(id);
            if (teamOptional.isPresent()) {
                teamRepository.deleteById(id);
                return ResponseEntity.ok("Команда успешно удалена");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Команда с указанным id не найдена");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при удалении команды: " + e.getMessage());
        }
    }

    @GetMapping("teams/get/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable("id") Integer id) {
        try {
            Optional<TeamEntity> teamOptional = teamRepository.findById(id);
            if (teamOptional.isPresent()) {
                TeamEntity team = teamOptional.get();
                return ResponseEntity.ok(team);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Команда с указанным id не найдена");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при получении команды: " + e.getMessage());
        }
    }
}
