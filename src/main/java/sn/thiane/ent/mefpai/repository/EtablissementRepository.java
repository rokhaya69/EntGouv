package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Etablissement;

/**
 * Spring Data SQL repository for the Etablissement entity.
 */
@Repository
public interface EtablissementRepository extends EtablissementRepositoryWithBagRelationships, JpaRepository<Etablissement, Long> {
    default Optional<Etablissement> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Etablissement> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Etablissement> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct etablissement from Etablissement etablissement left join fetch etablissement.persoAdmin left join fetch etablissement.commune left join fetch etablissement.inspection",
        countQuery = "select count(distinct etablissement) from Etablissement etablissement"
    )
    Page<Etablissement> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct etablissement from Etablissement etablissement left join fetch etablissement.persoAdmin left join fetch etablissement.commune left join fetch etablissement.inspection"
    )
    List<Etablissement> findAllWithToOneRelationships();

    @Query(
        "select etablissement from Etablissement etablissement left join fetch etablissement.persoAdmin left join fetch etablissement.commune left join fetch etablissement.inspection where etablissement.id =:id"
    )
    Optional<Etablissement> findOneWithToOneRelationships(@Param("id") Long id);
}
