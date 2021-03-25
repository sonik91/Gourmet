import { Component,Input,OnInit } from '@angular/core';
import { NewRestoService } from 'src/app/service/new-resto.service';
import { faTimes, faMapMarkedAlt, faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgForm} from '@angular/forms'
import { ListeRestoService } from 'src/app/service/liste-resto.service';



@Component({
  selector: 'app-ajout-restaurant',
  templateUrl: './ajout-restaurant.component.html',
  styleUrls: ['./ajout-restaurant.component.css']
})
export class AjoutRestaurantComponent implements OnInit {

  @Input()
  adresse:any;
  constructor(public newResto:NewRestoService, private listeResto:ListeRestoService) { }

  faTimes = faTimes;
  faMapMarkedAlt = faMapMarkedAlt;
  faHome = faHome;
  faSpinner = faSpinner;

  ngOnInit(): void {
    document.getElementById("backdrop").addEventListener("click",()=>{this.close()});//fermer modal si click en dehor de la modal
    document.getElementById("iconExit").addEventListener("click",()=>{this.close()});//fermer modal si click sur la croix
    document.getElementById("buttonCancel").addEventListener("click",()=>{this.close()})//fermer modal si click sur le bouton annuler
    document.querySelectorAll('input').forEach((e)=>{e.addEventListener("change",()=>{this.toggleSubmitActive();})})//activer le submit quand les input sont remplie
  }

  onSubmit(f: NgForm){//envoie du formulaire
    const buttonSubmit = document.getElementById("buttonSubmit");
    if(buttonSubmit.className === "active"){//verifier que le bouton submit est activer
      buttonSubmit.classList.add("cacher");//remplacer le bouton envoyer par un spunner
      document.getElementById("spinnerSubmit").classList.remove("cacher");
      console.log(f);
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({"address": f.form.value.adresse}, (result, statut)=>{//transfome l'adresse en coordonee gps (prend du temps)
        if(statut ==="OK"){
          const coordone = result[0].geometry.location.toJSON();
          let newResto = {
            "restaurantName": f.form.value.name,
            "address": f.form.value.adresse,
            "lat": coordone.lat,
            "long": coordone.lng,
            "placeRating": [],
            "marker": null,
            "ratings": []
          }
          this.listeResto.ajouterResto(newResto);//l ajoute a la liste des resto local
          this.adresse[1].setCenter(result[0].geometry.location);//recentre la carte sur le nouveau resto
          this.close();//ferme la modal
        }

        else{
          console.log("imposible de trouver les coordonée latLng")
        }
      });
    }
  }

  toggleSubmitActive(){//activer ou desactiver le bouton envoye
    let ChampsRemplie=true;
    document.querySelectorAll('input').forEach((e)=>{if(e.value==="" && e.className === "inputRenseignementNewResto"){ChampsRemplie=false}});
    if(ChampsRemplie){
      document.getElementById("buttonSubmit").classList.add("active");
    }
    else{
      document.getElementById("buttonSubmit").classList.remove("active");
    }
  }

  close(){
    this.newResto.addRestoToggle = false;
  }

}
