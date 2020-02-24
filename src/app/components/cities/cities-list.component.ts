import { Component, OnInit } from "@angular/core";
import { ICity } from "../../models/city.model";
import { CitiesService } from '../../services/cities/cities.service';

@Component({
    selector: 'cities-list',
    templateUrl: './cities-list.component.html',
    styleUrls: ['./cities-list.component.css']
})

export class CitiesListComponent implements OnInit {

    cities: ICity[];

    constructor(private citiesService: CitiesService) { }

    ngOnInit(): void {
        this.getCities();
    }

    public async getCities() {

        this.cities = await this.citiesService.getCities();

    }

}