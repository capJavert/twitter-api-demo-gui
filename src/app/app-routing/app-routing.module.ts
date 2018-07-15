import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProtectedComponent} from "../protected/protected.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminLayoutComponent} from "../_layouts/admin-layout/admin-layout.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {ErrorComponent} from "../error/error.component";
import {twitterRoutes} from "../twitter/twitter.routes";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: 'twitter', pathMatch: 'full'},
      ...twitterRoutes
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  },
  {path: 'error', component: ErrorComponent, data: {breadcrumb: "ERRORS.ERROR"}},
  {path: '**', component: PageNotFoundComponent, data: {breadcrumb: "404"}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }
