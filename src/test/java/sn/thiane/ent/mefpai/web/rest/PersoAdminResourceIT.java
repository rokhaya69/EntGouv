package sn.thiane.ent.mefpai.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import sn.thiane.ent.mefpai.IntegrationTest;
import sn.thiane.ent.mefpai.domain.PersoAdmin;
import sn.thiane.ent.mefpai.domain.enumeration.Sexe;
import sn.thiane.ent.mefpai.repository.PersoAdminRepository;

/**
 * Integration tests for the {@link PersoAdminResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PersoAdminResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Sexe DEFAULT_SEXE = Sexe.Masculin;
    private static final Sexe UPDATED_SEXE = Sexe.Feminin;

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/perso-admins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PersoAdminRepository persoAdminRepository;

    @Mock
    private PersoAdminRepository persoAdminRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersoAdminMockMvc;

    private PersoAdmin persoAdmin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersoAdmin createEntity(EntityManager em) {
        PersoAdmin persoAdmin = new PersoAdmin()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .email(DEFAULT_EMAIL)
            .adresse(DEFAULT_ADRESSE)
            .telephone(DEFAULT_TELEPHONE)
            .sexe(DEFAULT_SEXE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE);
        return persoAdmin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersoAdmin createUpdatedEntity(EntityManager em) {
        PersoAdmin persoAdmin = new PersoAdmin()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .sexe(UPDATED_SEXE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);
        return persoAdmin;
    }

    @BeforeEach
    public void initTest() {
        persoAdmin = createEntity(em);
    }

    @Test
    @Transactional
    void createPersoAdmin() throws Exception {
        int databaseSizeBeforeCreate = persoAdminRepository.findAll().size();
        // Create the PersoAdmin
        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isCreated());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeCreate + 1);
        PersoAdmin testPersoAdmin = persoAdminList.get(persoAdminList.size() - 1);
        assertThat(testPersoAdmin.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersoAdmin.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testPersoAdmin.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPersoAdmin.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testPersoAdmin.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersoAdmin.getSexe()).isEqualTo(DEFAULT_SEXE);
        assertThat(testPersoAdmin.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testPersoAdmin.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createPersoAdminWithExistingId() throws Exception {
        // Create the PersoAdmin with an existing ID
        persoAdmin.setId(1L);

        int databaseSizeBeforeCreate = persoAdminRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setNom(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setPrenom(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setEmail(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setAdresse(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setTelephone(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexeIsRequired() throws Exception {
        int databaseSizeBeforeTest = persoAdminRepository.findAll().size();
        // set the field null
        persoAdmin.setSexe(null);

        // Create the PersoAdmin, which fails.

        restPersoAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isBadRequest());

        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPersoAdmins() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        // Get all the persoAdminList
        restPersoAdminMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persoAdmin.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPersoAdminsWithEagerRelationshipsIsEnabled() throws Exception {
        when(persoAdminRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPersoAdminMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(persoAdminRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPersoAdminsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(persoAdminRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPersoAdminMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(persoAdminRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getPersoAdmin() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        // Get the persoAdmin
        restPersoAdminMockMvc
            .perform(get(ENTITY_API_URL_ID, persoAdmin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(persoAdmin.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)));
    }

    @Test
    @Transactional
    void getNonExistingPersoAdmin() throws Exception {
        // Get the persoAdmin
        restPersoAdminMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPersoAdmin() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();

        // Update the persoAdmin
        PersoAdmin updatedPersoAdmin = persoAdminRepository.findById(persoAdmin.getId()).get();
        // Disconnect from session so that the updates on updatedPersoAdmin are not directly saved in db
        em.detach(updatedPersoAdmin);
        updatedPersoAdmin
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .sexe(UPDATED_SEXE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restPersoAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPersoAdmin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPersoAdmin))
            )
            .andExpect(status().isOk());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
        PersoAdmin testPersoAdmin = persoAdminList.get(persoAdminList.size() - 1);
        assertThat(testPersoAdmin.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersoAdmin.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersoAdmin.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPersoAdmin.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testPersoAdmin.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersoAdmin.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testPersoAdmin.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testPersoAdmin.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, persoAdmin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(persoAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(persoAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persoAdmin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePersoAdminWithPatch() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();

        // Update the persoAdmin using partial update
        PersoAdmin partialUpdatedPersoAdmin = new PersoAdmin();
        partialUpdatedPersoAdmin.setId(persoAdmin.getId());

        partialUpdatedPersoAdmin
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restPersoAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersoAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersoAdmin))
            )
            .andExpect(status().isOk());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
        PersoAdmin testPersoAdmin = persoAdminList.get(persoAdminList.size() - 1);
        assertThat(testPersoAdmin.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersoAdmin.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersoAdmin.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPersoAdmin.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testPersoAdmin.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersoAdmin.getSexe()).isEqualTo(DEFAULT_SEXE);
        assertThat(testPersoAdmin.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testPersoAdmin.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdatePersoAdminWithPatch() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();

        // Update the persoAdmin using partial update
        PersoAdmin partialUpdatedPersoAdmin = new PersoAdmin();
        partialUpdatedPersoAdmin.setId(persoAdmin.getId());

        partialUpdatedPersoAdmin
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .sexe(UPDATED_SEXE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restPersoAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersoAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersoAdmin))
            )
            .andExpect(status().isOk());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
        PersoAdmin testPersoAdmin = persoAdminList.get(persoAdminList.size() - 1);
        assertThat(testPersoAdmin.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersoAdmin.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersoAdmin.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPersoAdmin.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testPersoAdmin.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersoAdmin.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testPersoAdmin.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testPersoAdmin.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, persoAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(persoAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(persoAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPersoAdmin() throws Exception {
        int databaseSizeBeforeUpdate = persoAdminRepository.findAll().size();
        persoAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersoAdminMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(persoAdmin))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersoAdmin in the database
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePersoAdmin() throws Exception {
        // Initialize the database
        persoAdminRepository.saveAndFlush(persoAdmin);

        int databaseSizeBeforeDelete = persoAdminRepository.findAll().size();

        // Delete the persoAdmin
        restPersoAdminMockMvc
            .perform(delete(ENTITY_API_URL_ID, persoAdmin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersoAdmin> persoAdminList = persoAdminRepository.findAll();
        assertThat(persoAdminList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
