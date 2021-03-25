import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  //Fonction assyncrone pour recupere la position du client-------
  getPosition = () => {
    return new Promise((resolve: any) => {
      navigator.geolocation.getCurrentPosition((e) => { resolve(e) });
    })
  }
  //------------------
  async position() {
    let e = await this.getPosition();
    return e;
  }
}
