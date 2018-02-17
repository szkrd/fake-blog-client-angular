import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  static getItem (id: string): string {
    return window.sessionStorage.getItem(id);
  }

  static setItem (id: string, s: string) {
    window.sessionStorage.setItem(id, s);
  }

  constructor(private name = 'store') {}

  getItem (id: string, fallback?: any): any {
    let result;
    try {
      result = JSON.parse(SessionStorageService.getItem(`${this.name}.${id}`));
    } catch (err) {
      console.error(err);
    }
    return result === undefined || result === null ? fallback : result;
  }

  setItem (id: string, value: any): void {
    try {
      SessionStorageService.setItem(`${this.name}.${id}`, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }
}

export default SessionStorageService;
