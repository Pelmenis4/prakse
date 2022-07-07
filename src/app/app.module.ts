import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { FormsModule } from '@angular/forms';
import { DashboardDocumentComponent } from './dashboard/dashboard-document/dashboard-document.component';
import { PaginationComponent } from './dashboard/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentViewDataComponent } from './document-view/document-view-data/document-view-data.component';
import { DocumentViewPageComponent } from './document-view/document-view-page/document-view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    DashboardComponent,
    DropdownDirective,
    DashboardDocumentComponent,
    PaginationComponent,
    DocumentViewComponent,
    DocumentViewDataComponent,
    DocumentViewPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
