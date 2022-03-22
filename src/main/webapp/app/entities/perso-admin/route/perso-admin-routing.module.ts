import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersoAdminComponent } from '../list/perso-admin.component';
import { PersoAdminDetailComponent } from '../detail/perso-admin-detail.component';
import { PersoAdminUpdateComponent } from '../update/perso-admin-update.component';
import { PersoAdminRoutingResolveService } from './perso-admin-routing-resolve.service';

const persoAdminRoute: Routes = [
  {
    path: '',
    component: PersoAdminComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersoAdminDetailComponent,
    resolve: {
      persoAdmin: PersoAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersoAdminUpdateComponent,
    resolve: {
      persoAdmin: PersoAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersoAdminUpdateComponent,
    resolve: {
      persoAdmin: PersoAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(persoAdminRoute)],
  exports: [RouterModule],
})
export class PersoAdminRoutingModule {}
