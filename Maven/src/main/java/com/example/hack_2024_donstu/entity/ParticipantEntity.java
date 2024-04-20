package com.example.hack_2024_donstu.entity;

import jakarta.persistence.*;

public class ParticipantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fullName_f", nullable = false)
    private String fullName;

    @Column(name = "email_f", nullable = false)
    private String email;

    @Column(name = "text_f", nullable = false)
    private String text;

    @ManyToOne
    private TeamEntity team;

    public ParticipantEntity(Integer id, TeamEntity team, String fullName, String email, String text) {
        this.id = id;
        this.team = team;
        this.fullName = fullName;
        this.email = email;
        this.text = text;
    }

    public ParticipantEntity() {}

    public Integer getId() {
        return this.id;
    }

    public Integer setId(Integer id) {
        return this.id = id;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public TeamEntity getTeam() {
        return this.team;
    }

    public TeamEntity setTeam(TeamEntity team) {
        return this.team = team;
    }
}
