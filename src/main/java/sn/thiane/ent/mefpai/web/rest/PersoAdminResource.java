package sn.thiane.ent.mefpai.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sn.thiane.ent.mefpai.domain.PersoAdmin;
import sn.thiane.ent.mefpai.repository.PersoAdminRepository;
import sn.thiane.ent.mefpai.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link sn.thiane.ent.mefpai.domain.PersoAdmin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PersoAdminResource {

    private final Logger log = LoggerFactory.getLogger(PersoAdminResource.class);

    private static final String ENTITY_NAME = "persoAdmin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersoAdminRepository persoAdminRepository;

    public PersoAdminResource(PersoAdminRepository persoAdminRepository) {
        this.persoAdminRepository = persoAdminRepository;
    }

    /**
     * {@code POST  /perso-admins} : Create a new persoAdmin.
     *
     * @param persoAdmin the persoAdmin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new persoAdmin, or with status {@code 400 (Bad Request)} if the persoAdmin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/perso-admins")
    public ResponseEntity<PersoAdmin> createPersoAdmin(@Valid @RequestBody PersoAdmin persoAdmin) throws URISyntaxException {
        log.debug("REST request to save PersoAdmin : {}", persoAdmin);
        if (persoAdmin.getId() != null) {
            throw new BadRequestAlertException("A new persoAdmin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersoAdmin result = persoAdminRepository.save(persoAdmin);
        return ResponseEntity
            .created(new URI("/api/perso-admins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /perso-admins/:id} : Updates an existing persoAdmin.
     *
     * @param id the id of the persoAdmin to save.
     * @param persoAdmin the persoAdmin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated persoAdmin,
     * or with status {@code 400 (Bad Request)} if the persoAdmin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the persoAdmin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/perso-admins/{id}")
    public ResponseEntity<PersoAdmin> updatePersoAdmin(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PersoAdmin persoAdmin
    ) throws URISyntaxException {
        log.debug("REST request to update PersoAdmin : {}, {}", id, persoAdmin);
        if (persoAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, persoAdmin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!persoAdminRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PersoAdmin result = persoAdminRepository.save(persoAdmin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, persoAdmin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /perso-admins/:id} : Partial updates given fields of an existing persoAdmin, field will ignore if it is null
     *
     * @param id the id of the persoAdmin to save.
     * @param persoAdmin the persoAdmin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated persoAdmin,
     * or with status {@code 400 (Bad Request)} if the persoAdmin is not valid,
     * or with status {@code 404 (Not Found)} if the persoAdmin is not found,
     * or with status {@code 500 (Internal Server Error)} if the persoAdmin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/perso-admins/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PersoAdmin> partialUpdatePersoAdmin(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PersoAdmin persoAdmin
    ) throws URISyntaxException {
        log.debug("REST request to partial update PersoAdmin partially : {}, {}", id, persoAdmin);
        if (persoAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, persoAdmin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!persoAdminRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PersoAdmin> result = persoAdminRepository
            .findById(persoAdmin.getId())
            .map(existingPersoAdmin -> {
                if (persoAdmin.getNom() != null) {
                    existingPersoAdmin.setNom(persoAdmin.getNom());
                }
                if (persoAdmin.getPrenom() != null) {
                    existingPersoAdmin.setPrenom(persoAdmin.getPrenom());
                }
                if (persoAdmin.getEmail() != null) {
                    existingPersoAdmin.setEmail(persoAdmin.getEmail());
                }
                if (persoAdmin.getAdresse() != null) {
                    existingPersoAdmin.setAdresse(persoAdmin.getAdresse());
                }
                if (persoAdmin.getTelephone() != null) {
                    existingPersoAdmin.setTelephone(persoAdmin.getTelephone());
                }
                if (persoAdmin.getSexe() != null) {
                    existingPersoAdmin.setSexe(persoAdmin.getSexe());
                }
                if (persoAdmin.getPhoto() != null) {
                    existingPersoAdmin.setPhoto(persoAdmin.getPhoto());
                }
                if (persoAdmin.getPhotoContentType() != null) {
                    existingPersoAdmin.setPhotoContentType(persoAdmin.getPhotoContentType());
                }

                return existingPersoAdmin;
            })
            .map(persoAdminRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, persoAdmin.getId().toString())
        );
    }

    /**
     * {@code GET  /perso-admins} : get all the persoAdmins.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of persoAdmins in body.
     */
    @GetMapping("/perso-admins")
    public ResponseEntity<List<PersoAdmin>> getAllPersoAdmins(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of PersoAdmins");
        Page<PersoAdmin> page;
        if (eagerload) {
            page = persoAdminRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = persoAdminRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /perso-admins/:id} : get the "id" persoAdmin.
     *
     * @param id the id of the persoAdmin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the persoAdmin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/perso-admins/{id}")
    public ResponseEntity<PersoAdmin> getPersoAdmin(@PathVariable Long id) {
        log.debug("REST request to get PersoAdmin : {}", id);
        Optional<PersoAdmin> persoAdmin = persoAdminRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(persoAdmin);
    }

    /**
     * {@code DELETE  /perso-admins/:id} : delete the "id" persoAdmin.
     *
     * @param id the id of the persoAdmin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/perso-admins/{id}")
    public ResponseEntity<Void> deletePersoAdmin(@PathVariable Long id) {
        log.debug("REST request to delete PersoAdmin : {}", id);
        persoAdminRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
