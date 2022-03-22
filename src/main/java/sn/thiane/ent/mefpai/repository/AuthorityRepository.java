package sn.thiane.ent.mefpai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.thiane.ent.mefpai.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
