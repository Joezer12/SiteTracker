import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../services/interfaces/settings';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  ajustes: Settings;
  constructor(private settings: SettingsService) {
    // @Inject(DOCUMENT) private document
  }

  ngOnInit() {
    // Este código toma el tema que se tiene en el index.thml y dependiendo de cual sea pone el check en el tema que se esta usando
    const url = document.getElementById('theme').getAttribute('href');
    const tema = url.split('/');
    let temaActual = tema[tema.length - 1];
    temaActual = temaActual.split('.')[0];
    temaActual += '-theme';
    document.getElementsByClassName(temaActual)[0].classList.add('working');
  }

  changeTheme(theme: string, link: any) {
    this.applyCheck(link);
    const url = `assets/css/colors/${theme}.css`;
    this.ajustes.temaUrl = url;
    this.ajustes.tema = theme;
    // this.document.getElementById('theme').setAttribute('href', url);
    document.getElementById('theme').setAttribute('href', url);
    this.settings.saveSettings(this.ajustes);
  }

  applyCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const selector of selectores) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }
}
