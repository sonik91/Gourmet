import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/principale/map/map.component';
import { ListeRestoComponent } from './component/principale/info/liste-resto/liste-resto.component';
import { ListeRestoCardComponent } from './component/template/liste-resto-card/liste-resto-card.component';
import { ListeAvisCardComponent } from './component/template/liste-avis-card/liste-avis-card.component';
import { ConteneurComponent } from './component/principale/info/conteneur/conteneur.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AjoutRestaurantComponent } from './component/principale/ajout-restaurant/ajout-restaurant.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailRestoComponent } from './component/principale/detail-resto/detail-resto.component';
import { DetailNoteComponent } from './component/template/detail-note/detail-note.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListeRestoComponent,
    ListeRestoCardComponent,
    ListeAvisCardComponent,
    ConteneurComponent,
    AjoutRestaurantComponent,
    DetailRestoComponent,
    DetailNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
