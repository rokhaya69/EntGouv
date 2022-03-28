package sn.thiane.ent.mefpai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Syllabus.
 */
@Entity
@Table(name = "syllabus")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Syllabus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "syllabus", nullable = false)
    private String syllabus;

    @ManyToOne
    @JsonIgnoreProperties(value = { "filiere", "serie", "syllabi", "matieres" }, allowSetters = true)
    private Programme programme;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Syllabus id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSyllabus() {
        return this.syllabus;
    }

    public Syllabus syllabus(String syllabus) {
        this.setSyllabus(syllabus);
        return this;
    }

    public void setSyllabus(String syllabus) {
        this.syllabus = syllabus;
    }

    public Programme getProgramme() {
        return this.programme;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
    }

    public Syllabus programme(Programme programme) {
        this.setProgramme(programme);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Syllabus)) {
            return false;
        }
        return id != null && id.equals(((Syllabus) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Syllabus{" +
            "id=" + getId() +
            ", syllabus='" + getSyllabus() + "'" +
            "}";
    }
}
