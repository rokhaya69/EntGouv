package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import org.hibernate.annotations.QueryHints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import sn.thiane.ent.mefpai.domain.PersoAdmin;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class PersoAdminRepositoryWithBagRelationshipsImpl implements PersoAdminRepositoryWithBagRelationships {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Optional<PersoAdmin> fetchBagRelationships(Optional<PersoAdmin> persoAdmin) {
        return persoAdmin.map(this::fetchEvaluations);
    }

    @Override
    public Page<PersoAdmin> fetchBagRelationships(Page<PersoAdmin> persoAdmins) {
        return new PageImpl<>(fetchBagRelationships(persoAdmins.getContent()), persoAdmins.getPageable(), persoAdmins.getTotalElements());
    }

    @Override
    public List<PersoAdmin> fetchBagRelationships(List<PersoAdmin> persoAdmins) {
        return Optional.of(persoAdmins).map(this::fetchEvaluations).get();
    }

    PersoAdmin fetchEvaluations(PersoAdmin result) {
        return entityManager
            .createQuery(
                "select persoAdmin from PersoAdmin persoAdmin left join fetch persoAdmin.evaluations where persoAdmin is :persoAdmin",
                PersoAdmin.class
            )
            .setParameter("persoAdmin", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<PersoAdmin> fetchEvaluations(List<PersoAdmin> persoAdmins) {
        return entityManager
            .createQuery(
                "select distinct persoAdmin from PersoAdmin persoAdmin left join fetch persoAdmin.evaluations where persoAdmin in :persoAdmins",
                PersoAdmin.class
            )
            .setParameter("persoAdmins", persoAdmins)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
