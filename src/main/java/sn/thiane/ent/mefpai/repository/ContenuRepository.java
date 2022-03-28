package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Contenu;

/**
 * Spring Data SQL repository for the Contenu entity.
 */
@Repository
public interface ContenuRepository extends JpaRepository<Contenu, Long> {
    default Optional<Contenu> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Contenu> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Contenu> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct contenu from Contenu contenu left join fetch contenu.seance",
        countQuery = "select count(distinct contenu) from Contenu contenu"
    )
    Page<Contenu> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct contenu from Contenu contenu left join fetch contenu.seance")
    List<Contenu> findAllWithToOneRelationships();

    @Query("select contenu from Contenu contenu left join fetch contenu.seance where contenu.id =:id")
    Optional<Contenu> findOneWithToOneRelationships(@Param("id") Long id);
}
