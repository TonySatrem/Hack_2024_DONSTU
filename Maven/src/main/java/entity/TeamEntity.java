package entity;

import enums.VoteType;
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

    @Column(name = "usabilityVotes_id", nullable = false)
    private Integer usabilityVotes;

    @Column(name = "layoutVotes_id", nullable = false)
    private Integer layoutVotes;

    @Column(name = "realizationVotes_id", nullable = false)
    private Integer realizationVotes;

    public TeamEntity(Integer id, String name, String login, String password, byte[] banner) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.banner = banner;
        this.designVotes = 0;
        this.usabilityVotes = 0;
        this.layoutVotes = 0;
        this.realizationVotes = 0;
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

    public Integer getUsabilityVotes() {
        return designVotes;
    }

    public void setUsabilityVotes(Integer designVotes) {
        this.designVotes = designVotes;
    }

    public Integer getLayoutVotes() {
        return designVotes;
    }

    public void setLayoutVotes(Integer designVotes) { this.designVotes = designVotes; }

    public Integer getRealizationVotes() {
        return designVotes;
    }

    public void setRealizationVotes(Integer designVotes) {
        this.designVotes = designVotes;
    }

    public void addDesignVote() {
        this.designVotes += 1;
    }
    public void addUsabilityVote() {
        this.usabilityVotes += 1;
    }
    public void addLayoutVote() {
        this.layoutVotes += 1;
    }
    public void addRealizationVote() {
        this.realizationVotes += 1;
    }

    public void addVote(VoteType type) {
        switch (type) {
            case Design -> this.addDesignVote();
            case Usability -> this.addUsabilityVote();
            case Layout -> this.addLayoutVote();
            case Realization -> this.addRealizationVote();
        }
    }
}
