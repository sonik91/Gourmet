import { Component, Input, OnInit } from '@angular/core';
import { ListeRestoService } from 'src/app/service/liste-resto.service';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NewRestoService } from 'src/app/service/new-resto.service';


@Component({
  selector: 'app-liste-resto',
  templateUrl: './liste-resto.component.html',
  styleUrls: ['./liste-resto.component.css']
})
export class ListeRestoComponent implements OnInit {

  constructor(public ServiceListeResto: ListeRestoService, public newResto:NewRestoService) { }

  @Input() carte;
  iconEtoile = faStar;
  iconSearch = faSearch;
  listeRestoVisible = [];
  listeVisible=true;
  ngOnInit(): void {
    this.initEvent();
    document.getElementById("filtreNote").addEventListener("change",(e)=>{this.filtreNoteChange(e.target);})
    document.getElementById("toggle").addEventListener("click",()=>{this.toggleListe()});

  }

  searchPlace(f){//recentrer la map sur un lieux different
    const adresse = f.form.value.inputSearchPlace;
    if(adresse != ""){
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({"address":adresse},(result,statut)=>{
        console.log(result);
        if(statut === "OK"){
          console.log(result[0].geometry.location)
          this.carte.setCenter(result[0].geometry.location);
          this.carte.setZoom(17);
        }
      })
    }
  }

  newRestoButton(){
      this.newResto.addRestoToggle = true;
  }

  initEvent(){//setTimeout pour donner un peut de temps a google place de repondre
    this.carte.addListener("zoom_changed", () => {//change zoom
      setTimeout(()=>{this.changeListeResto()},500);
    });

    this.carte.addListener("idle", () => {//idle renvoie position
      setTimeout(()=>{this.changeListeResto()},500);
   });

  }

  changeListeResto(){
    this.listeRestoVisible = [];
    setTimeout(()=>{//permet de laisser le temps de refraichir la liste lors d'un ajout de comentaire
      this.listeRestoVisible = this.ServiceListeResto.getListeRestoVisible();

      this.filtreNoteChange(document.getElementById("filtreNote"));
    },10);
  }

  //toggle liste resto (pour la fermer sur la gauche)
toggleListe(){
  const flecheToggle = document.getElementById("toggleArrow");
  const conteneur = document.getElementById("conteneur").parentElement;
  conteneur.style.transition = "0.5s";
  console.log(conteneur);

  if(this.listeVisible){
    flecheToggle.style.transform = "rotateZ(45deg)";
    conteneur.style.transform = "translate(-250px)";
    this.listeVisible = false;
  }

  else{
    flecheToggle.style.transform = "rotateZ(225deg)";
    conteneur.style.transform = "translate(0px)";
    this.listeVisible = true;
  }

}

filtreNoteChange(e){
  const value = e.value;
  const TousRestoVisible = this.ServiceListeResto.getListeRestoVisible();
  if(value === "all"){this.listeRestoVisible = TousRestoVisible; this.listeRestoVisible.forEach((e)=>{e.marker.setVisible(true);})}
  else{
    TousRestoVisible.forEach((e)=>{e.marker.setVisible(false);})
    this.listeRestoVisible = TousRestoVisible.filter((e:any)=>{if(e.moyene>=value){return e}});
    this.listeRestoVisible.forEach((e)=>{e.marker.setVisible(true);})
  }


}

}
