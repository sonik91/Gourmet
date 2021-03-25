import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from'@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-liste-avis-card',
  templateUrl: './liste-avis-card.component.html',
  styleUrls: ['./liste-avis-card.component.css']
})
export class ListeAvisCardComponent implements OnInit {

  @Input() avis;

  constructor() { }

  public etoiles = [];
  public dateComentaire = "";

  ngOnInit(): void {
    this.initNote();
    this.dateComentaire = new Date(this.avis.times).toISOString().substr(0,10);
  }

  initNote(){
    for(let i=0;i<5;i++){
      if((this.avis.stars)>i){this.etoiles[i]=faStar}
      else{this.etoiles[i]=farStar}
    }
  }

}
