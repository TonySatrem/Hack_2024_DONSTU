package com.example.hack_2024_donstu.repositories;

import com.example.hack_2024_donstu.entity.ParticipantEntity;
import com.example.hack_2024_donstu.entity.TeamEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends CrudRepository<ParticipantRepository, Integer> {
    ParticipantEntity findByTeam(TeamEntity team);
}
