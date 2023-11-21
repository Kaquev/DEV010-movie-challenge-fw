import { ComponentFixture, TestBed} from '@angular/core/testing';
import { CardMoviesComponent } from './card-movies.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieResult } from 'src/app/models/movie.model';

describe('CardMoviesComponent', () => {
  let component: CardMoviesComponent;
  let fixture: ComponentFixture<CardMoviesComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMoviesComponent],
      providers: [ApiService],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MatPaginatorModule],
    });
    fixture = TestBed.createComponent(CardMoviesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inject the ApiService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Recupera datos de la API y los asigna a las variables moviesData y totalPages
  it('should retrieve data from API and assign it to moviesData and totalPages variables', function() {

    const page = 1;
    const response = {
      total_pages: 5,
      results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }] as MovieResult[]
    };
    spyOn(apiService, 'getMoviesData').and.returnValue(of(response as unknown as Movie[]));


    component.getData(page);


    expect(apiService.getMoviesData).toHaveBeenCalledWith(page);
    expect(component.totalPages).toBe(response.total_pages);
    expect(component.moviesData).toEqual(jasmine.arrayContaining(response.results));
  });


  // Recupera datos de la API y los asigna a las variables moviesData y totalPages cuando la respuesta de la API está vacía
  it('should retrieve data from API and assign it to moviesData and totalPages variables when the API response is empty', function() {

    const page = 1;
    const response = {
      total_pages: 0,
      results: [] as MovieResult[]
    };
    spyOn(apiService, 'getMoviesData').and.returnValue(of(response as unknown as Movie[]));


    component.getData(page);


    expect(apiService.getMoviesData).toHaveBeenCalledWith(page);
    expect(component.totalPages).toBe(response.total_pages);
    expect(component.moviesData).toEqual(jasmine.arrayContaining(response.results));
  });

  // Llama al método 'getData' con el número de página correcto cuando se activa 'handlePage'
  it('should call getData with the correct page number when handlePage is triggered', function() {


    spyOn(component, 'getData');


    component.handlePage({ pageIndex: 2 });


    expect(component.getData).toHaveBeenCalledWith(3);
  });
});
