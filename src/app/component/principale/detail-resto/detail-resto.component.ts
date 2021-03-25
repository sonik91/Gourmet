import { Component, OnInit } from '@angular/core';
import { ListeRestoService } from 'src/app/service/liste-resto.service';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from'@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-detail-resto',
  templateUrl: './detail-resto.component.html',
  styleUrls: ['./detail-resto.component.css']
})
export class DetailRestoComponent implements OnInit {

  constructor(public listeResto:ListeRestoService) { }
  faTime = faTimes;
  public detailNoteActif = true;//permet d'afficher ou non le detail des notes(rafraichir le component a l ajout d une note)
  etoilesVotreNote = [farStar,farStar,farStar,farStar,farStar,0]
  public resto = this.listeResto.modalDetailResto;
  public tailleImage;//taille du conteneur de l'image

  ngOnInit(): void {
    //console.log(this.resto);
    this.tailleImage = {"width":document.getElementById("imageStreeView").offsetWidth, "height": document.getElementById("imageStreeView").offsetHeight }
    document.getElementById("backdrop").addEventListener("click",()=>{this.close();});//fermer modal click exterieur modal
    document.getElementById("close").addEventListener("click",()=>{this.close();});//fermer modal click croix

    //modifie note au click etoile
    document.getElementById("unEtoileVotreNote").addEventListener("click",()=>{this.changerNoteVotreAvis(1);});
    document.getElementById("deuxEtoileVotreNote").addEventListener("click",()=>{this.changerNoteVotreAvis(2);});
    document.getElementById("troisEtoileVotreNote").addEventListener("click",()=>{this.changerNoteVotreAvis(3);});
    document.getElementById("quatreEtoileVotreNote").addEventListener("click",()=>{this.changerNoteVotreAvis(4);});
    document.getElementById("cinqEtoileVotreNote").addEventListener("click",()=>{this.changerNoteVotreAvis(5);});
  }

  changerNoteVotreAvis(note){
    this.etoilesVotreNote = [farStar,farStar,farStar,farStar,farStar,note];
    for(let i=0;i<5;i++){
      if((note)>i){this.etoilesVotreNote[i]=faStar}
      else{this.etoilesVotreNote[i]=farStar}
    }
    document.getElementById("votreAvisButton").removeAttribute("disabled");

  }

  envoyerAvis(f){
    //console.log(f)
    if(f.form.value.votreAvisNom === ""){f.form.value.votreAvisNom="Anonyme"}
    let avis = {
    "stars": this.etoilesVotreNote[5],
    "name": f.form.value.votreAvisNom,
    "times": Date.now(),
    "comment":f.form.value.votreAvisTexte
  };
    this.listeResto.ajouterAvis(avis);
    this.detailNoteActif = false;
    setTimeout(()=>{this.detailNoteActif = true},10);
    document.getElementById("votreAvis").style.display = "none";
  }

  close(){
    this.resto.marker.map.setCenter({"lat":this.resto.lat, "lng":this.resto.long});
    this.listeResto.modalDetailResto = false;
  }



}
