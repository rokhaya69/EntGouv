package sn.thiane.ent.mefpai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Contenu.
 */
@Entity
@Table(name = "contenu")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Contenu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "contenu", nullable = false, unique = true)
    private String contenu;

    @JsonIgnoreProperties(value = { "cours", "salle", "groupe", "absences" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Seance seance;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Contenu id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenu() {
        return this.contenu;
    }

    public Contenu contenu(String contenu) {
        this.setContenu(contenu);
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Seance getSeance() {
        return this.seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }

    public Contenu seance(Seance seance) {
        this.setSeance(seance);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contenu)) {
            return false;
        }
        return id != null && id.equals(((Contenu) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contenu{" +
            "id=" + getId() +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
