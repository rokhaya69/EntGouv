package sn.thiane.ent.mefpai.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import sn.thiane.ent.mefpai.web.rest.TestUtil;

class CoursTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cours.class);
        Cours cours1 = new Cours();
        cours1.setId(1L);
        Cours cours2 = new Cours();
        cours2.setId(cours1.getId());
        assertThat(cours1).isEqualTo(cours2);
        cours2.setId(2L);
        assertThat(cours1).isNotEqualTo(cours2);
        cours1.setId(null);
        assertThat(cours1).isNotEqualTo(cours2);
    }
}
