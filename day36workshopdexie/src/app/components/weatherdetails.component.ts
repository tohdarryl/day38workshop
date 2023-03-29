import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Weather } from '../model/weather';
import { CitiesRepository } from '../services/cities.repo';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy{

OPENWEATHER_API_KEY = environment.openWeatherApiKey;
params$! : Subscription
private city: string = "Singapore"
private country?: string
private imageUrl?: string
model = new Weather("Singapore", 0,0,0,"","",0,0)


  constructor(private weatherSvc: WeatherService, private router: Router,
                private activatedRoute: ActivatedRoute, private citiesRepo: CitiesRepository){}
  
ngOnInit(): void {
    // get city from listcity.component.html [routerlink]="['weather', c.city]"
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.city = params['city']
      }
    )
    // this method retrieves Weather details from API and sets attributes
    this.getWeatherFromAPI(this.city);
}

ngOnDestroy(): void {
    this.params$.unsubscribe()
}

getWeatherFromAPI(city: string){
  this.weatherSvc.getWeather(city, this.OPENWEATHER_API_KEY)
  // if the return of weatherSvc.getWeather() does not give you of type Promise<any>
  // .then( (result:any) => {
    .then( async (result) => {
    // use citiesRepo to retrieve ImageUrl which was previously inputted in the form by you
    const cityImageUrl = await this.citiesRepo.getCityImageUrl(city)
    console.log(">>> imageUrl",cityImageUrl)
    this.model = new Weather(
      city,
      result.main.temp,
      result.main.pressure,
      result.main.humidity,
      result.weather[0].description,
      cityImageUrl,
      result.wind.deg,
      result.wind.speed

    )
  }).catch((err) => {
    console.log(err)
    this.router.navigate(['/'])
  })
}

}
