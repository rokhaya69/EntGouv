import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cours',
        data: { pageTitle: 'entMefpaiApp.cours.home.title' },
        loadChildren: () => import('./cours/cours.module').then(m => m.CoursModule),
      },
      {
        path: 'classe',
        data: { pageTitle: 'entMefpaiApp.classe.home.title' },
        loadChildren: () => import('./classe/classe.module').then(m => m.ClasseModule),
      },
      {
        path: 'salle',
        data: { pageTitle: 'entMefpaiApp.salle.home.title' },
        loadChildren: () => import('./salle/salle.module').then(m => m.SalleModule),
      },
      {
        path: 'matiere',
        data: { pageTitle: 'entMefpaiApp.matiere.home.title' },
        loadChildren: () => import('./matiere/matiere.module').then(m => m.MatiereModule),
      },
      {
        path: 'groupe',
        data: { pageTitle: 'entMefpaiApp.groupe.home.title' },
        loadChildren: () => import('./groupe/groupe.module').then(m => m.GroupeModule),
      },
      {
        path: 'seance',
        data: { pageTitle: 'entMefpaiApp.seance.home.title' },
        loadChildren: () => import('./seance/seance.module').then(m => m.SeanceModule),
      },
      {
        path: 'contenu',
        data: { pageTitle: 'entMefpaiApp.contenu.home.title' },
        loadChildren: () => import('./contenu/contenu.module').then(m => m.ContenuModule),
      },
      {
        path: 'syllabus',
        data: { pageTitle: 'entMefpaiApp.syllabus.home.title' },
        loadChildren: () => import('./syllabus/syllabus.module').then(m => m.SyllabusModule),
      },
      {
        path: 'absence',
        data: { pageTitle: 'entMefpaiApp.absence.home.title' },
        loadChildren: () => import('./absence/absence.module').then(m => m.AbsenceModule),
      },
      {
        path: 'apprenant',
        data: { pageTitle: 'entMefpaiApp.apprenant.home.title' },
        loadChildren: () => import('./apprenant/apprenant.module').then(m => m.ApprenantModule),
      },
      {
        path: 'poste',
        data: { pageTitle: 'entMefpaiApp.poste.home.title' },
        loadChildren: () => import('./poste/poste.module').then(m => m.PosteModule),
      },
      {
        path: 'professeur',
        data: { pageTitle: 'entMefpaiApp.professeur.home.title' },
        loadChildren: () => import('./professeur/professeur.module').then(m => m.ProfesseurModule),
      },
      {
        path: 'parent',
        data: { pageTitle: 'entMefpaiApp.parent.home.title' },
        loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule),
      },
      {
        path: 'perso-admin',
        data: { pageTitle: 'entMefpaiApp.persoAdmin.home.title' },
        loadChildren: () => import('./perso-admin/perso-admin.module').then(m => m.PersoAdminModule),
      },
      {
        path: 'etablissement',
        data: { pageTitle: 'entMefpaiApp.etablissement.home.title' },
        loadChildren: () => import('./etablissement/etablissement.module').then(m => m.EtablissementModule),
      },
      {
        path: 'filiere',
        data: { pageTitle: 'entMefpaiApp.filiere.home.title' },
        loadChildren: () => import('./filiere/filiere.module').then(m => m.FiliereModule),
      },
      {
        path: 'serie',
        data: { pageTitle: 'entMefpaiApp.serie.home.title' },
        loadChildren: () => import('./serie/serie.module').then(m => m.SerieModule),
      },
      {
        path: 'programme',
        data: { pageTitle: 'entMefpaiApp.programme.home.title' },
        loadChildren: () => import('./programme/programme.module').then(m => m.ProgrammeModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'entMefpaiApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'departement',
        data: { pageTitle: 'entMefpaiApp.departement.home.title' },
        loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule),
      },
      {
        path: 'commune',
        data: { pageTitle: 'entMefpaiApp.commune.home.title' },
        loadChildren: () => import('./commune/commune.module').then(m => m.CommuneModule),
      },
      {
        path: 'inspection',
        data: { pageTitle: 'entMefpaiApp.inspection.home.title' },
        loadChildren: () => import('./inspection/inspection.module').then(m => m.InspectionModule),
      },
      {
        path: 'ressource',
        data: { pageTitle: 'entMefpaiApp.ressource.home.title' },
        loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule),
      },
      {
        path: 'evaluation',
        data: { pageTitle: 'entMefpaiApp.evaluation.home.title' },
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
      },
      {
        path: 'note',
        data: { pageTitle: 'entMefpaiApp.note.home.title' },
        loadChildren: () => import('./note/note.module').then(m => m.NoteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
