package sn.thiane.ent.mefpai.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import sn.thiane.ent.mefpai.web.rest.TestUtil;

class SyllabusTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Syllabus.class);
        Syllabus syllabus1 = new Syllabus();
        syllabus1.setId(1L);
        Syllabus syllabus2 = new Syllabus();
        syllabus2.setId(syllabus1.getId());
        assertThat(syllabus1).isEqualTo(syllabus2);
        syllabus2.setId(2L);
        assertThat(syllabus1).isNotEqualTo(syllabus2);
        syllabus1.setId(null);
        assertThat(syllabus1).isNotEqualTo(syllabus2);
    }
}
