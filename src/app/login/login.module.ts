import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [LoginComponent, RegistroComponent]
})
export class LoginModule {}
