package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.thiane.ent.mefpai.domain.Syllabus;

/**
 * Spring Data SQL repository for the Syllabus entity.
 */
@Repository
public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {
    default Optional<Syllabus> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Syllabus> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Syllabus> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct syllabus from Syllabus syllabus left join fetch syllabus.programme",
        countQuery = "select count(distinct syllabus) from Syllabus syllabus"
    )
    Page<Syllabus> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct syllabus from Syllabus syllabus left join fetch syllabus.programme")
    List<Syllabus> findAllWithToOneRelationships();

    @Query("select syllabus from Syllabus syllabus left join fetch syllabus.programme where syllabus.id =:id")
    Optional<Syllabus> findOneWithToOneRelationships(@Param("id") Long id);
}
