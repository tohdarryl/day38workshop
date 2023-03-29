import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListcityComponent } from './components/listcity.component';
import { WeatherdetailsComponent } from './components/weatherdetails.component';
import { AddcityComponent } from './components/addcity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ListcityComponent,
    WeatherdetailsComponent,
    AddcityComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
      
  ],
  // Insert service in provider
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
