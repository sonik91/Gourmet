import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewRestoService {

  constructor() { }

  infowindow:any = false;//defini si l infobule avec le bouton pour cree un nouveau restaurant doit etre afficher
  addRestoToggle =false;//defini si la modal de creation d'un restaurant doit etre afficher
  adresse



  createInfowindo(latLng){//rajouter une infobule pour cree un nouveau resto au click droit
    const geocoder = new google.maps.Geocoder()
    let info = new google.maps.InfoWindow;
    info.setPosition(latLng);

    geocoder.geocode({"location": latLng}, (result,statut)=>{
      if(statut === "OK"){
        this.adresse = result[0].formatted_address;
        info.setContent("<p style='margin:0; padding:0;'>"+
        "<span style='font-size: 1.2em;font-weight: 700;'>"+result[0].formatted_address+" </span>"+
        "<br /> <button id='buttonNewResto'>ajouté un lieux manquant</button> </p>");
        document.getElementById('buttonNewResto').addEventListener("click",()=>{this.addRestoToggle=true})
      }
      else{info.setContent("ajouter un restaurant ici");this.adresse=false}
    })
    return info;
}

suprimerInfoWindow(){
  if(this.infowindow != false){
    this.infowindow.close();
    this.infowindow = false;
  }
}
}
