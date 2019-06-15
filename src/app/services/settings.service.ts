import { Injectable } from '@angular/core';
import { Settings } from './interfaces/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private ajustes: Settings = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor() {}

  saveSettings(newSettings: Settings) {
    console.log('Guardando ajustes');
    localStorage.setItem('ajustes', JSON.stringify(newSettings));
  }

  loadSettings() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    console.log('Cargando ajustes');
  }
}
