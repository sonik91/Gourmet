import { Component, OnInit } from '@angular/core';
import { ListeRestoService } from 'src/app/service/liste-resto.service';
import { faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from'@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.css']
})
export class DetailNoteComponent implements OnInit {

  constructor(public listeResto:ListeRestoService) { }
  etoiles = [];
  public listeNote = {
    "moyenne":0,
    "nbNoteTotal":0,
    "unEtoile":0,
    "deuxEtoile":0,
    "troisEtoile":0,
    "quarteEtoile":0,
    "cinqEtoile":0,
  }

  ngOnInit(): void {
    if(this.listeResto.modalDetailResto.placeRating.length > 0 ){//si resto de googlePlace rajoute les info de google place
      this.listeNote.moyenne = this.listeResto.modalDetailResto.placeRating[0];
      this.listeNote.nbNoteTotal = this.listeResto.modalDetailResto.placeRating[1];
    }

    this.initListeEtoile();
  }

  initListeEtoile(){
    if(this.listeResto.modalDetailResto.ratings.length > 0){//si avis stocker en local

      let nombre = 0;
      //calcul la moyenne
      this.listeResto.modalDetailResto.ratings.map((e)=>nombre+=e.stars);
      nombre = nombre/this.listeResto.modalDetailResto.ratings.length;

      //addition des deux moyenne
      this.listeNote.moyenne = Number((((Number(nombre)*this.listeResto.modalDetailResto.ratings.length)+(this.listeNote.moyenne*this.listeNote.nbNoteTotal))/(this.listeNote.nbNoteTotal+this.listeResto.modalDetailResto.ratings.length)).toFixed(1));
      this.listeNote.nbNoteTotal += this.listeResto.modalDetailResto.ratings.length;

      this.listeResto.modalDetailResto.ratings.forEach((e)=>{
        switch(e.stars){
          case 1:
            this.listeNote.unEtoile++;
            break;
          case 2:
            this.listeNote.deuxEtoile++;
            break;
          case 3:
            this.listeNote.troisEtoile++;
            break;
          case 4:
            this.listeNote.quarteEtoile++;
            break;
          case 5:
            this.listeNote.cinqEtoile++;
            break;
        }
      })
    }

    for(let i=0;i<5;i++){//definir l icon de chaque etoile (plein,moitier,vide)
      if((this.listeNote.moyenne-0.99)>i){this.etoiles[i]=faStar}
      else if((this.listeNote.moyenne-1)>=(i-0.5)){this.etoiles[i]=faStarHalfAlt}
      else{this.etoiles[i]=farStar}
    }

  }

}
