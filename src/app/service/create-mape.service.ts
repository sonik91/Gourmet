import { Injectable } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { ListeRestoService } from './liste-resto.service';
import { NewRestoService } from './new-resto.service';

@Injectable({
  providedIn: 'root'
})
export class CreateMapeService {

  constructor(private listeResto:ListeRestoService, private newResto: NewRestoService) { }

  loader = new Loader({//clef api google map et style de la carte et librairie googlePlace
    apiKey: "AIzaSyCqjeHEjl4HAuVpy0hrHthpu23mt5nln8Q",
    version: "weekly",
    libraries: ["places"]
  });

  createMap(lat, lng, zoom, conteneur) {//lat centre carte - lng centre carte - niveau de zoom - {lat,lng}|false coords marker geolocation - ellement html qui contien la carte
    return new Promise((resolve: any)=>{//creation de la carte google avec l'api
    this.loader.load().then(() => {
      let map = new google.maps.Map(conteneur as HTMLElement, {//ellement html qui contien la carte
        center: { lat: lat, lng: lng },//coordoné pour centre la carte au depart
        zoom: zoom,
        disableDefaultUI: true,//suprimer tous les boutons de base de la carte google map
        styles: [{ "featureType": "poi", "stylers": [{ "visibility": "off" }] }],//retire les points d'interet (on rajoute ce dont on a besoin avec google place plus tard)
      });

      //ajouter les markeur

      //liste evenement----------------------------
      map.addListener("zoom_changed", () => {//change zoom
        this.newResto.suprimerInfoWindow()
        this.listeResto.editViewMap(map);
        let centre = map.getCenter().toJSON();
        localStorage.setItem("lat", String(centre.lat));
        localStorage.setItem("lng", String(centre.lng));
      });

      map.addListener("idle", () => {//idle renvoie position
        this.newResto.suprimerInfoWindow();
        this.listeResto.editViewMap(map);
        let centre = map.getCenter().toJSON();
        localStorage.setItem("lat", String(centre.lat));
        localStorage.setItem("lng", String(centre.lng));
     });

     map.addListener("rightclick", (e)=>{//click droit sur la carte
      this.newResto.suprimerInfoWindow();
      this.newResto.infowindow = this.newResto.createInfowindo(e.latLng);
      this.newResto.infowindow.open(map);
     });

     resolve(map);
    });

  });
  }


  createMarkerPosition(lat, lng, map) {//cree le marker qui indique la position de l'utilisateur
    let markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "blue",
      strokeColor: "blue",
      fillOpacity: 0.9,
      strokeWeight: 6,
      scale: 3,
    };
    const markerMe = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: "moi",
      icon: markerIcon,
    });
    return markerMe;
  }
}
