package sn.thiane.ent.mefpai.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import sn.thiane.ent.mefpai.web.rest.TestUtil;

class PersoAdminTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersoAdmin.class);
        PersoAdmin persoAdmin1 = new PersoAdmin();
        persoAdmin1.setId(1L);
        PersoAdmin persoAdmin2 = new PersoAdmin();
        persoAdmin2.setId(persoAdmin1.getId());
        assertThat(persoAdmin1).isEqualTo(persoAdmin2);
        persoAdmin2.setId(2L);
        assertThat(persoAdmin1).isNotEqualTo(persoAdmin2);
        persoAdmin1.setId(null);
        assertThat(persoAdmin1).isNotEqualTo(persoAdmin2);
    }
}
