import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(private settings: SettingsService) {
    // @Inject(DOCUMENT) private document
  }

  ngOnInit() {
    // Este código toma el tema que se tiene en el index.thml y dependiendo de cual sea pone el check en el tema que se esta usando
    const tema = document
      .getElementById('theme')
      .getAttribute('href')
      .split('/');
    let temaActual = tema[tema.length - 1].split('.')[0];
    temaActual += '-theme';
    document.getElementsByClassName(temaActual)[0].classList.add('working');
  }

  changeTheme(theme: string, link: any) {
    this.applyCheck(link);
    this.settings.applyingTheme(theme);
    this.settings.saveSettings();
  }

  applyCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const selector of selectores) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }
}
