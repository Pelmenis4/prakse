import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentViewComponent } from "./document-view/document-view.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard/page/:pageNumber', component: DashboardComponent },
    { path: 'document/:id', component: DocumentViewComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}