import { Injectable } from "@angular/core";
import Dexie, { Table } from "dexie";
import { City } from "../model/city";

@Injectable({
    providedIn: 'root'
  })

  // npm install dexie
  export class CitiesRepository extends Dexie{
    city!: Dexie.Table<City, string>

    constructor(){
        // database name
        super('citiesdb');
        // schema/db version
        this.version(1).stores({
            // collection/table name
            city: 'city'
        })
        this.city = this.table('city');
    }

    addCity(city: City): Promise<string>{
        return this.city.add(city)
    }

    async getAllCities(): Promise<City[]>{
        const cities = this.city.orderBy('city').toArray()
        return cities
    }
    
    async getCityImageUrl(city: string): Promise<any> {
        const cityResult = await this.city.get(city)
        return cityResult?.imageUrl
    }
  }