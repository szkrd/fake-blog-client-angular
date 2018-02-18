import { Injectable } from '@angular/core';

@Injectable()
export class DomUtilsService {

  constructor() { }

  // https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
  scrollToTop(scrollDuration = 500) {
    const cosParameter = window.scrollY / 2;
    let oldTimestamp = performance.now();
    let scrollCount = 0;

    function step (newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) {
        window.scrollTo(0, 0);
      }
      if (window.scrollY === 0) {
        return;
      }
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }
}
