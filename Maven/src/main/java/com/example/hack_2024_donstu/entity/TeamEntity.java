package com.example.hack_2024_donstu.entity;

import jakarta.persistence.*;

@Entity
public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name_f", nullable = false)
    private String name;

    @Column(name = "login_f", nullable = false)
    private String login;

    @Column(name = "password_f", nullable = false)
    private String password;

    @Lob
    @Column(name = "banner_f", nullable = false)
    private byte[] banner;

    @Column(name = "designVotes_id", nullable = false)
    private Integer designVotes;

    public TeamEntity(Integer id, String name, String login, String password, byte[] banner, Integer designVotes) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.banner = banner;
        this.designVotes = designVotes;
    }

    public TeamEntity() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getBanner() {
        return banner;
    }

    public void setBanner(byte[] banner) {
        this.banner = banner;
    }

    public Integer getDesignVotes() {
        return designVotes;
    }

    public void setDesignVotes(Integer designVotes) {
        this.designVotes = designVotes;
    }
}

