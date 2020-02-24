import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CitiesEndpoint } from "./cities-endpoint.service";
import { Observable } from 'rxjs/Rx';
import { ICity } from "../../models/city.model";

@Injectable()
export class CitiesService {
    constructor(private _citiesEndpoint: CitiesEndpoint) {
    }

    async getCities(): Promise<ICity[]> {

        return await this._citiesEndpoint.getCities().toPromise();

    }


}