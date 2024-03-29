package sn.thiane.ent.mefpai.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Poste;

/**
 * Spring Data SQL repository for the Poste entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PosteRepository extends JpaRepository<Poste, Long> {}
