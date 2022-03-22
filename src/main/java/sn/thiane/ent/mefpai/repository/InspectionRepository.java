package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Inspection;

/**
 * Spring Data SQL repository for the Inspection entity.
 */
@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Long> {
    default Optional<Inspection> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Inspection> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Inspection> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inspection from Inspection inspection left join fetch inspection.commune left join fetch inspection.persoAdmin",
        countQuery = "select count(distinct inspection) from Inspection inspection"
    )
    Page<Inspection> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct inspection from Inspection inspection left join fetch inspection.commune left join fetch inspection.persoAdmin")
    List<Inspection> findAllWithToOneRelationships();

    @Query(
        "select inspection from Inspection inspection left join fetch inspection.commune left join fetch inspection.persoAdmin where inspection.id =:id"
    )
    Optional<Inspection> findOneWithToOneRelationships(@Param("id") Long id);
}
