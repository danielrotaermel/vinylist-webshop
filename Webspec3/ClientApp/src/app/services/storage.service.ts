/**
 * @author Daniel Rotärmel
 */

import 'rxjs/add/operator/share';

import { Injectable } from '@angular/core';


export abstract class StorageService {
  public abstract get(): Storage;
  public abstract getItem(key: string): any;
  public abstract setItem(key: string, data: any);
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStorageService extends StorageService {
  public get(): Storage {
    return localStorage;
  }

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
