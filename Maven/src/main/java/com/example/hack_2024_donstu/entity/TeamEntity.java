package com.example.hack_2024_donstu.entity;

import com.example.hack_2024_donstu.config.ArrayListConverter;
import com.example.hack_2024_donstu.enums.VoteType;
import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "teamEntity_t")
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

    @Column(name = "designVotes_f")
    @Convert(converter = ArrayListConverter.class)
    private ArrayList<Integer> designVotes;

    @Column(name = "usabilityVotes_f")
    @Convert(converter = ArrayListConverter.class)
    private ArrayList<Integer> usabilityVotes;

    @Column(name = "layoutVotes_f")
    @Convert(converter = ArrayListConverter.class)
    private ArrayList<Integer> layoutVotes;

    @Column(name = "realizationVotes_f")
    @Convert(converter = ArrayListConverter.class)
    private ArrayList<Integer> realizationVotes;

    public TeamEntity(Integer id, String name, String login, String password, byte[] banner) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.banner = banner;
        this.designVotes = new ArrayList<Integer>();
        this.usabilityVotes = new ArrayList<Integer>();
        this.layoutVotes = new ArrayList<Integer>();
        this.realizationVotes = new ArrayList<Integer>();
    }

    public TeamEntity() {

    }

    public Integer getId() {
        return id;
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

    public ArrayList<Integer> getDesignVotes() {
        return designVotes;
    }

    public void setDesignVotes(ArrayList<Integer> designVotes) {
        this.designVotes = designVotes;
    }

    public ArrayList<Integer> getUsabilityVotes() {
        return usabilityVotes;
    }

    public void setUsabilityVotes(ArrayList<Integer> usabilityVotes) {
        this.usabilityVotes = usabilityVotes;
    }

    public ArrayList<Integer> getLayoutVotes() {
        return layoutVotes;
    }

    public void setLayoutVotes(ArrayList<Integer> layoutVotes) { this.layoutVotes = layoutVotes; }

    public ArrayList<Integer> getRealizationVotes() {
        return realizationVotes;
    }

    public void setRealizationVotes(ArrayList<Integer> realizationVotes) {
        this.realizationVotes = realizationVotes;
    }

    public void addDesignVote(Integer vote) {
        this.designVotes.add(vote);
    }
    public void addUsabilityVote(Integer vote) {
        this.usabilityVotes.add(vote);
    }
    public void addLayoutVote(Integer vote) {
        this.layoutVotes.add(vote);
    }
    public void addRealizationVote(Integer vote) {
        this.realizationVotes.add(vote);
    }

    public void addVote(VoteType type, Integer vote) {
        switch (type) {
            case Design -> this.addDesignVote(vote);
            case Usability -> this.addUsabilityVote(vote);
            case Layout -> this.addLayoutVote(vote);
            case Realization -> this.addRealizationVote(vote);
        }
    }
}