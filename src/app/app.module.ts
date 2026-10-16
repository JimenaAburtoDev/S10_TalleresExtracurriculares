import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Módulo clave para Reactive Forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
