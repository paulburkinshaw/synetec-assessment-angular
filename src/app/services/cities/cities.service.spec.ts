import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CitiesService } from './cities.service';
import { CitiesEndpoint } from './cities-endpoint.service';
import { ICity } from "../../models/city.model";
import { environment } from "../../../environments/environment";

import { Observable } from 'rxjs';

describe('CitiesService', () => {


  const mockCities = [
    { "id": 1, "name": "New York City", "description": "The one with that big park." },
    { "id": 2, "name": "Antwerp", "description": "The one with the cathedral that was never really finished." },
    { "id": 3, "name": "Paris", "description": "The one with that big tower." }
  ]

  const mockCitiesEndpoint = jasmine.createSpyObj('_citiesEndpoint', ['getCities', 'deleteCity']);
  mockCitiesEndpoint.getCities.and.returnValue(Observable.of(mockCities));


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CitiesService,
        { provide: CitiesEndpoint, useValue: mockCitiesEndpoint },
      ]
    });



  });

  
  it('should be created', inject([CitiesService], (service: CitiesService) => {
    expect(service).toBeTruthy();
  }));


  describe('getCities', () => {

    it('should call CitiesEndpoint.getCities', inject([CitiesService], (service: CitiesService) => {

      service.getCities();

      expect(mockCitiesEndpoint.getCities).toHaveBeenCalled();

    }));

    it('should return cities in correct format', inject([CitiesService], (service: CitiesService) => {

      const expectedCities: ICity[] = [
        { "id": 1, "name": "New York City", "description": "The one with that big park." },
        { "id": 2, "name": "Antwerp", "description": "The one with the cathedral that was never really finished." },
        { "id": 3, "name": "Paris", "description": "The one with that big tower." }
      ];

      service.getCities().then(function (result) {
        expect(result).toEqual(expectedCities);
      });

      
    }));

  });

  describe('deleteCity', () => {

    it('should call CitiesEndpoint.deleteCity with correct id', inject([CitiesService], (service: CitiesService)  => {

      const cityId = 1;
     
      service.deleteCity(cityId);

      expect(mockCitiesEndpoint.deleteCity).toHaveBeenCalledWith(cityId);
      
    }));

  });


});
