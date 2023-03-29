import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.development';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  /*
  countries = [
    {country: 'Singapore', city: 'Singapore'},
    {country: 'United Kingdom', city: 'London'},
    {country: 'Malaysia', city: 'Kuala Lumpur'},
    {country: 'China', city: 'Beijing'},
    {country: 'India', city: 'New Delhi'}
  ]
  // Array
  imageBasedCity = [
    {city: 'Singapore', imageUrl: 'https://bit.ly/3nqmL4p'},
    {city: 'London', imageUrl: 'https://bit.ly/3ZkaziU'},
    {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/40hW28X'},
    {city: 'Beijing', imageUrl: 'https://bit.ly/3lHoUZh'},
    {city: 'New Delhi', imageUrl: 'https://bit.ly/3JOLdnE'},
  ]
  */


  
  constructor(private http: HttpClient) { }


  /*
  https://api.openweathermap.org/data/2.5/weather?q=<ci
  ty>&appid=<API key>
  */
  getWeather(city: string, apiKey: string): Promise<any>{
      const params = new HttpParams()
      .set('q', city)
      .set('appid', apiKey);

      return lastValueFrom(this.http.get(environment.openWeatherApiUrl, {params: params}))
  }


}
