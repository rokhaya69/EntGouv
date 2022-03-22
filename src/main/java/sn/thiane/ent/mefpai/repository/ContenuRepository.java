package sn.thiane.ent.mefpai.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Contenu;

/**
 * Spring Data SQL repository for the Contenu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContenuRepository extends JpaRepository<Contenu, Long> {}
