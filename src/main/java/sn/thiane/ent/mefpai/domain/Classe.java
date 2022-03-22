package sn.thiane.ent.mefpai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import sn.thiane.ent.mefpai.domain.enumeration.NiveauEtude;

/**
 * A Classe.
 */
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false, unique = true)
    private String titre;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau_etude", nullable = false)
    private NiveauEtude niveauEtude;

    @OneToMany(mappedBy = "classe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "syllabus", "seances", "ressources", "matiere", "classe", "professeur" }, allowSetters = true)
    private Set<Cours> cours = new HashSet<>();

    @OneToMany(mappedBy = "classe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "seances", "apprenants", "ressources", "evaluations", "classe" }, allowSetters = true)
    private Set<Groupe> groupes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "classes", "etablissement" }, allowSetters = true)
    private Filiere filiere;

    @ManyToOne
    @JsonIgnoreProperties(value = { "classes", "etablissement" }, allowSetters = true)
    private Serie serie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Classe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return this.titre;
    }

    public Classe titre(String titre) {
        this.setTitre(titre);
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public NiveauEtude getNiveauEtude() {
        return this.niveauEtude;
    }

    public Classe niveauEtude(NiveauEtude niveauEtude) {
        this.setNiveauEtude(niveauEtude);
        return this;
    }

    public void setNiveauEtude(NiveauEtude niveauEtude) {
        this.niveauEtude = niveauEtude;
    }

    public Set<Cours> getCours() {
        return this.cours;
    }

    public void setCours(Set<Cours> cours) {
        if (this.cours != null) {
            this.cours.forEach(i -> i.setClasse(null));
        }
        if (cours != null) {
            cours.forEach(i -> i.setClasse(this));
        }
        this.cours = cours;
    }

    public Classe cours(Set<Cours> cours) {
        this.setCours(cours);
        return this;
    }

    public Classe addCours(Cours cours) {
        this.cours.add(cours);
        cours.setClasse(this);
        return this;
    }

    public Classe removeCours(Cours cours) {
        this.cours.remove(cours);
        cours.setClasse(null);
        return this;
    }

    public Set<Groupe> getGroupes() {
        return this.groupes;
    }

    public void setGroupes(Set<Groupe> groupes) {
        if (this.groupes != null) {
            this.groupes.forEach(i -> i.setClasse(null));
        }
        if (groupes != null) {
            groupes.forEach(i -> i.setClasse(this));
        }
        this.groupes = groupes;
    }

    public Classe groupes(Set<Groupe> groupes) {
        this.setGroupes(groupes);
        return this;
    }

    public Classe addGroupe(Groupe groupe) {
        this.groupes.add(groupe);
        groupe.setClasse(this);
        return this;
    }

    public Classe removeGroupe(Groupe groupe) {
        this.groupes.remove(groupe);
        groupe.setClasse(null);
        return this;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Classe filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public Classe serie(Serie serie) {
        this.setSerie(serie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classe)) {
            return false;
        }
        return id != null && id.equals(((Classe) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", niveauEtude='" + getNiveauEtude() + "'" +
            "}";
    }
}
