import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings;

  constructor() { 
    this.settings = new Settings();
  }

}
