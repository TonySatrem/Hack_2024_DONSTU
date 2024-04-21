package com.example.hack_2024_donstu.repositories;

import com.example.hack_2024_donstu.entity.TeamEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends CrudRepository<TeamEntity, Integer> {
    TeamEntity findByLogin(String login);

    //List<TeamEntity> findAll();
}
