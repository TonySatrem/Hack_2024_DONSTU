package com.example.hack_2024_donstu.controller;

import com.example.hack_2024_donstu.enums.VoteType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.hack_2024_donstu.entity.TeamEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.example.hack_2024_donstu.repositories.TeamRepository;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping("/add")
    public boolean addVote(
            @RequestBody int teamId,
            @RequestBody int vote,
            @RequestBody String voteType
    ) {
        if (vote < 0 || vote > 10)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid vote");

        VoteType type;
        try {
            type = VoteType.valueOf(voteType);
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid vote type");
        }

        TeamEntity team = teamRepository.findById(teamId).orElse(null);
        if (team == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team not found");

        team.addVote(type, vote);

        return true;
    }
}
