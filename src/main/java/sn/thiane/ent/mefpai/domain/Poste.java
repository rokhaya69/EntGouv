package sn.thiane.ent.mefpai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import sn.thiane.ent.mefpai.domain.enumeration.NomPoste;

/**
 * A Poste.
 */
@Entity
@Table(name = "poste")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Poste implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_poste", nullable = false)
    private NomPoste nomPoste;

    @OneToMany(mappedBy = "poste")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "user", "ressources", "evaluations", "poste" }, allowSetters = true)
    private Set<PersoAdmin> persoAdmins = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Poste id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NomPoste getNomPoste() {
        return this.nomPoste;
    }

    public Poste nomPoste(NomPoste nomPoste) {
        this.setNomPoste(nomPoste);
        return this;
    }

    public void setNomPoste(NomPoste nomPoste) {
        this.nomPoste = nomPoste;
    }

    public Set<PersoAdmin> getPersoAdmins() {
        return this.persoAdmins;
    }

    public void setPersoAdmins(Set<PersoAdmin> persoAdmins) {
        if (this.persoAdmins != null) {
            this.persoAdmins.forEach(i -> i.setPoste(null));
        }
        if (persoAdmins != null) {
            persoAdmins.forEach(i -> i.setPoste(this));
        }
        this.persoAdmins = persoAdmins;
    }

    public Poste persoAdmins(Set<PersoAdmin> persoAdmins) {
        this.setPersoAdmins(persoAdmins);
        return this;
    }

    public Poste addPersoAdmin(PersoAdmin persoAdmin) {
        this.persoAdmins.add(persoAdmin);
        persoAdmin.setPoste(this);
        return this;
    }

    public Poste removePersoAdmin(PersoAdmin persoAdmin) {
        this.persoAdmins.remove(persoAdmin);
        persoAdmin.setPoste(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Poste)) {
            return false;
        }
        return id != null && id.equals(((Poste) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Poste{" +
            "id=" + getId() +
            ", nomPoste='" + getNomPoste() + "'" +
            "}";
    }
}
