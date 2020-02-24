import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CitiesEndpoint } from './cities-endpoint.service';
import { environment } from "../../../environments/environment";

describe('CitiesEndpoint', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const baseUrl: string = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CitiesEndpoint
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  let citiesEndpoint: CitiesEndpoint, _mockBackend;

  beforeEach(inject([CitiesEndpoint], (service: CitiesEndpoint) => {
    citiesEndpoint = service;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([CitiesEndpoint], (service: CitiesEndpoint) => {
    expect(service).toBeTruthy();
  }));


  describe('getCities', () => {

    it('should make a GET request to /api/cities', () => {

      const expectedUrl = `${baseUrl}/api/cities`;

      citiesEndpoint.getCities()
        .subscribe();

      const req = httpTestingController.expectOne(expectedUrl);

      req.flush({});

    });

    it('should return items returned from /api/cities', () => {
      
      const expectedUrl = `${baseUrl}/api/cities`;

      const mockResponse = [
        { "id": 1, "name": "New York City", "description": "The one with that big park." },
        { "id": 2, "name": "Antwerp", "description": "The one with the cathedral that was never really finished." },
        { "id": 3, "name": "Paris", "description": "The one with that big tower." }
      ]

      const expectedResponse = [
        { "id": 1, "name": "New York City", "description": "The one with that big park." },
        { "id": 2, "name": "Antwerp", "description": "The one with the cathedral that was never really finished." },
        { "id": 3, "name": "Paris", "description": "The one with that big tower." }
      ];
      
      citiesEndpoint.getCities().subscribe(actualResponse => {
        expect(actualResponse).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(`${expectedUrl}`);

      req.flush(mockResponse);


    });

  });

});
