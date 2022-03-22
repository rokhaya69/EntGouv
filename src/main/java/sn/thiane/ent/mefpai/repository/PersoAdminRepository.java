package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.PersoAdmin;

/**
 * Spring Data SQL repository for the PersoAdmin entity.
 */
@Repository
public interface PersoAdminRepository extends PersoAdminRepositoryWithBagRelationships, JpaRepository<PersoAdmin, Long> {
    default Optional<PersoAdmin> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<PersoAdmin> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<PersoAdmin> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct persoAdmin from PersoAdmin persoAdmin left join fetch persoAdmin.user left join fetch persoAdmin.poste",
        countQuery = "select count(distinct persoAdmin) from PersoAdmin persoAdmin"
    )
    Page<PersoAdmin> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct persoAdmin from PersoAdmin persoAdmin left join fetch persoAdmin.user left join fetch persoAdmin.poste")
    List<PersoAdmin> findAllWithToOneRelationships();

    @Query(
        "select persoAdmin from PersoAdmin persoAdmin left join fetch persoAdmin.user left join fetch persoAdmin.poste where persoAdmin.id =:id"
    )
    Optional<PersoAdmin> findOneWithToOneRelationships(@Param("id") Long id);
}
