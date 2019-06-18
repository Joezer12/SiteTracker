import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Settings = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor() {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  loadSettings() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.applyingTheme(this.ajustes.tema);
  }

  applyingTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.ajustes.temaUrl = url;
    this.ajustes.tema = theme;
    document.getElementById('theme').setAttribute('href', this.ajustes.temaUrl);
  }
}
