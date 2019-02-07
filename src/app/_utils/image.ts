import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageUtils {

  url = '//unsplash.it/';

  constructor() {}

  getImageUrl(min: number, max: number) {
    return this.url + this.randomImg(min, max) + '/' + this.randomImg(min, max) + '/?random';
  }

  randomImg(min: number, max: number) {
    return Math.floor((Math.random() * max) + min);
  }
}
