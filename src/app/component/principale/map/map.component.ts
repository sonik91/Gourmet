import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { CreateMapeService } from 'src/app/service/create-mape.service';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { NewRestoService } from 'src/app/service/new-resto.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private geolocation:GeolocationService, private creeCarte:CreateMapeService, public newResto:NewRestoService) { }

  conteneur//ellement html qui va contenir la map
  carte

  ngOnInit(): void {
    this.conteneur = document.getElementById('map');
    this.createMap();//cree une carte avec des coordoner par default sans marker
  }

  async createMap(){
    //recuperer les coordoner dans le localStorage si existe sinon des valeurs par defaut
    const lat = localStorage.getItem('lat') === null?48.83989927029616:localStorage.getItem('lat');
    const lng = localStorage.getItem('lng') === null?2.33757:localStorage.getItem('lng');

    this.creeCarte.createMap(Number(lat),Number(lng),17, this.conteneur).then((carte:any)=>{//cree une carte avec les donne du localStorage si existe ou des valeur par default sinon
      this.carte = carte;
      this.geolocationCenter();//tente de geolocaliser
    });
  }

  geolocationCenter(){//si geolocation fonctionne recentre la carte

    this.geolocation.position().then((emplacement: any) => {
      const lat = emplacement.coords.latitude;
      const lng = emplacement.coords.longitude;
      //si geolocation fonctionne enregistre dans le localStorage
      localStorage.setItem('lat', lat);
      localStorage.setItem('lng', lng);

      this.carte.setCenter({"lat": lat,"lng":lng});
      this.creeCarte.createMarkerPosition(lat,lng,this.carte);
    });

  }

}
