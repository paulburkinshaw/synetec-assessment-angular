import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { CitiesListComponent } from './cities-list.component';
import { CitiesService } from '../../services/cities/cities.service';
import { CitiesEndpoint } from '../../services/cities/cities-endpoint.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CitiesListComponent', () => {

  const mockCitiesServiceService = jasmine.createSpyObj('CitiesService', ['getCities']);
  let component: CitiesListComponent;
  let fixture: any;

  beforeEach(() => {
    fixture = TestBed.overrideComponent(CitiesListComponent, {
      set: {
        template: `<div>Mock CitiesListComponent template</div>`
      }
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CitiesListComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CitiesService, useValue: mockCitiesServiceService }
      ]
    }).compileComponents();
  }));
  
  it('should create the cities list component', async(() => {
    let component = fixture.createComponent(CitiesListComponent).componentInstance;
    expect(component).toBeTruthy();
  }));


  describe('getCities', () => {

    it('should call CitiesService.getCities method', fakeAsync(() => {
      let component = fixture.createComponent(CitiesListComponent).componentInstance;

      component.getCities();

      tick();

      expect(mockCitiesServiceService.getCities).toHaveBeenCalled();
    }))


    it('cities property should be set with items from CitiesService.getCities method', fakeAsync(() => {
      let component = fixture.createComponent(CitiesListComponent).componentInstance;

      const mockCities = [
        { "id": 1, "name": "New York City", "description": "The one with that big park." },
        { "id": 2, "name": "Antwerp", "description": "The one with the cathedral that was never really finished." },
        { "id": 3, "name": "Paris", "description": "The one with that big tower." }
      ];

      mockCitiesServiceService.getCities.and.returnValue((mockCities));

      component.getCities();

      tick();

      component['cities'];

      expect(component['cities']).toEqual(mockCities);
      
    }))

  });



});
