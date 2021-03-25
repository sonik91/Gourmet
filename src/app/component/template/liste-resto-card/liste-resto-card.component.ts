import { Component, Input, OnInit } from '@angular/core';
import { faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from'@fortawesome/free-regular-svg-icons'
import { ListeRestoService } from 'src/app/service/liste-resto.service';

@Component({
  selector: 'app-liste-resto-card',
  templateUrl: './liste-resto-card.component.html',
  styleUrls: ['./liste-resto-card.component.css']
})
export class ListeRestoCardComponent implements OnInit {
  @Input() resto
  constructor(private listeResto:ListeRestoService) { }
  TypeEtoiles={"plein": faStar, "vide":farStar, "moitier": faStarHalfAlt};
  etoiles=[];
  nombreVote:number = 0;

  ngOnInit(): void {
    this.resto.moyene = this.calculMoyen();
  }


  openModal(){
    this.listeResto.modalDetailResto = this.resto;
  }

  public calculMoyen(){//calcul la moyene et actualise la variable etoile pour metre les bonne etoile sur la page
    let nombre = 0;
    this.nombreVote = this.resto.ratings.length;
    this.resto.ratings.map((e)=>nombre+=e.stars);//aditione toutes les notes pour faire la moyenne apres
    if(this.resto.ratings.length === 0){nombre = 0}//si pas d avis ne pas faire de division par 0
    else{nombre = nombre/this.resto.ratings.length;}

    if(this.resto.placeRating.length>0){//si notes dans googlePlace
      this.nombreVote += this.resto.placeRating[1];
      //addition des deux moyenne
      nombre = (((this.resto.placeRating[0]*this.resto.placeRating[1])+(nombre*this.resto.ratings.length))/(this.resto.ratings.length+this.resto.placeRating[1]));
    }

    nombre = Number(nombre.toFixed(1));//arrondie a 1 chiffre apres la virgule

    for(let i=0;i<5;i++){//attribuer les bon icon d etoiles (plein,moitier,vide)
      if((nombre-0.99)>i){this.etoiles[i]=this.TypeEtoiles.plein}
      else if((nombre-1)>=(i-0.5)){this.etoiles[i]=this.TypeEtoiles.moitier}
      else{this.etoiles[i]=this.TypeEtoiles.vide}
    }

    return nombre;
  }

}
