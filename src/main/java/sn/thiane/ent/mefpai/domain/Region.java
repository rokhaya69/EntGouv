package sn.thiane.ent.mefpai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import sn.thiane.ent.mefpai.domain.enumeration.NomRegion;

/**
 * A Region.
 */
@Entity
@Table(name = "region")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Region implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_region", nullable = false)
    private NomRegion nomRegion;

    @OneToMany(mappedBy = "region")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "communes", "region" }, allowSetters = true)
    private Set<Departement> departements = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Region id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NomRegion getNomRegion() {
        return this.nomRegion;
    }

    public Region nomRegion(NomRegion nomRegion) {
        this.setNomRegion(nomRegion);
        return this;
    }

    public void setNomRegion(NomRegion nomRegion) {
        this.nomRegion = nomRegion;
    }

    public Set<Departement> getDepartements() {
        return this.departements;
    }

    public void setDepartements(Set<Departement> departements) {
        if (this.departements != null) {
            this.departements.forEach(i -> i.setRegion(null));
        }
        if (departements != null) {
            departements.forEach(i -> i.setRegion(this));
        }
        this.departements = departements;
    }

    public Region departements(Set<Departement> departements) {
        this.setDepartements(departements);
        return this;
    }

    public Region addDepartement(Departement departement) {
        this.departements.add(departement);
        departement.setRegion(this);
        return this;
    }

    public Region removeDepartement(Departement departement) {
        this.departements.remove(departement);
        departement.setRegion(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Region)) {
            return false;
        }
        return id != null && id.equals(((Region) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Region{" +
            "id=" + getId() +
            ", nomRegion='" + getNomRegion() + "'" +
            "}";
    }
}
