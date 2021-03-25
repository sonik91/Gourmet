import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListeRestoService {

  constructor() { }

  public modalDetailResto: any = false;//contient le resto dont on doit afficher le details dans une modal

  private dernierActualisation = 0;//dateStamp de la dernier actualisation de la liste des resto

   async editViewMap(map) {

    if (this.dernierActualisation < Date.now() + 100) {//permet d'éviter du surcharger le serveur avec trop de requette raprocher
      this.dernierActualisation = Date.now();
      //rajouter en local la liste des resto de google place
      this.apelleGooglePlace(map).then((restoPlaces:any)=>{
        restoPlaces.forEach(restoPlace => {//rajouter en local la liste des restuarant de google place qui n'y sont pas deja
          let restoName = []
          this.listeResto.forEach((listeResto)=>{restoName.push(listeResto.restaurantName);});
          if(!restoName.includes(restoPlace.restaurantName)){this.listeResto.push(restoPlace)}
        });


        //defini les bordure de la carte visible
      const borneLat = { "min": map.getBounds().getSouthWest().lat(), "max": map.getBounds().getNorthEast().lat() };
      const borneLng = { "min": map.getBounds().getSouthWest().lng(), "max": map.getBounds().getNorthEast().lng() };

      this.listeResto.forEach((resto) => {
        //cree un marker sur la carte pour tous les restaurants qui sont compris dans les limite defini au dessus
        if (resto.lat > borneLat.min && resto.lat < borneLat.max && resto.long > borneLng.min && resto.long < borneLng.max) {
          resto.marker = this.createMarker(resto.lat, resto.long, resto.restaurantName, map);
          resto.marker.addListener("click",()=>{this.modalDetailResto = resto})
        }
        else {
          if (resto.marker != null) { resto.marker.setMap(null); }
          resto.marker = null;
        }

      });
      return true
    })
    }
  }

  createMarker(lat, lng, title, map) {//cree un marker de restaurant
    const marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: title,
    });
    return marker;
  }

  async apelleGooglePlace(map) {
    let e = await this.googlePlace(map);
    return e;
  }

  googlePlace(map) {//recuperer la liste des restaurant de google place dans les limite de la carte

    return new Promise((resolve:any)=>{
      let listeRaiponse= [];

    let request = {"bounds": map.getBounds(),"types": ["restaurant"]};

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results)=>{
      console.log(results);

      results.forEach((e)=>{

        const newResto = {
      "restaurantName": e.name,
      "address": e.vicinity,
      "lat": e.geometry.location.lat(),
      "long": e.geometry.location.lng(),
      "marker": null,
      "placeRating": [e.rating, e.user_ratings_total],
      "ratings": []
        }

        listeRaiponse.push(newResto);
      });
      resolve(listeRaiponse);
    });
  });

  }

  getListeResto() { return this.listeResto; }//renvoie la liste des restaurant contenue en local

  getListeRestoVisible() {//liste des restaurant visible sur la carte
    return this.listeResto.filter(e => e.marker != null);
  }

  ajouterResto(resto) {
    this.listeResto.push(resto);
  }

  ajouterAvis(avis) {
    this.listeResto.forEach((e) => {
      if (e.restaurantName === this.modalDetailResto.restaurantName && e.address === this.modalDetailResto.address) {
        e.ratings.push(avis);
        this.modalDetailResto = e;
      }
    });
    console.log(this.listeResto)
  }

  //fichier json des resto---------------------
  listeResto = [
    {
      "restaurantName": "Bronco",
      "address": "39 Rue des Petites Écuries, 75010 Paris",
      "lat": 47.76308230839618,
      "long": -3.12018850730225,
      "placeRating": [],
      "marker": null,
      "ratings": [
        {
          "stars": 4,
          "name": "Michelle",
          "times": 1615311198792,
          "comment": "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
        },
        {
          "stars": 5,
          "name": "Lucas",
          "times": 1615311098792,
          "comment": "Tout simplement mon restaurant préféré !"
        }
      ]
    },
    {
      "restaurantName": "Babalou",
      "address": "4 Rue Lamarck, 75018 Paris",
      "lat": 48.8865035,
      "long": 2.3442197,
      "placeRating": [],
      "marker": null,
      "ratings": [
        {
          "stars": 5,
          "name": "Michelle",
          "times": 1615311198792,
          "comment": "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
        },
        {
          "stars": 3,
          "name": "Lucas",
          "times": 1615311098792,
          "comment": "J'ai trouvé ça correct, sans plus"
        }
      ]
    }
  ];

}
