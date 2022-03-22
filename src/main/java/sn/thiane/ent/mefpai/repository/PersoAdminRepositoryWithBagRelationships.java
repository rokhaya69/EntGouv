package sn.thiane.ent.mefpai.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import sn.thiane.ent.mefpai.domain.PersoAdmin;

public interface PersoAdminRepositoryWithBagRelationships {
    Optional<PersoAdmin> fetchBagRelationships(Optional<PersoAdmin> persoAdmin);

    List<PersoAdmin> fetchBagRelationships(List<PersoAdmin> persoAdmins);

    Page<PersoAdmin> fetchBagRelationships(Page<PersoAdmin> persoAdmins);
}
