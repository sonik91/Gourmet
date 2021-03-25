import { Component, Input, OnInit } from '@angular/core';
import { ListeRestoService } from 'src/app/service/liste-resto.service';

@Component({
  selector: 'app-conteneur',
  templateUrl: './conteneur.component.html',
  styleUrls: ['./conteneur.component.css']
})
export class ConteneurComponent implements OnInit {

  @Input() carte;

  constructor( public listeResto:ListeRestoService) { }

  ngOnInit(): void {
  }

}
