import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMoviesComponent } from './card-movies.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CardMoviesComponent', () => {
  let component: CardMoviesComponent;
  let fixture: ComponentFixture<CardMoviesComponent>;
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getMoviesData']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMoviesComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
      ],
    });

    const movieDataMock = {
      //se espera que devuelva un objeto que se asemeje a los datos getMoviesData
      total_pages: 1,
      results: [
        {
          id: 1,
          title: 'Movie A',
          poster_path: '',
          release_date: '',
          popularity: 1,
        },
        {
          id: 2,
          title: 'Movie B',
          poster_path: '',
          release_date: '',
          popularity: 2,
        },
        {
          id: 3,
          title: 'Movie C',
          poster_path: '',
          release_date: '',
          popularity: 3,
        },
      ],
    };

    apiServiceSpy.getMoviesData.and.returnValue(of(movieDataMock));

    fixture = TestBed.createComponent(CardMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Recupera datos de la API y los asigna a las variables moviesData y totalPages
  it('should retrieve data from API and assign it to moviesData and totalPages variables', function () {
    component.getData(1);
    expect(component.totalPages).toBe(1);
    expect(component.moviesData).toEqual([
      {
        id: 1,
        title: 'Movie A',
        poster_path: '',
        release_date: '',
        popularity: 1,
      },
      {
        id: 2,
        title: 'Movie B',
        poster_path: '',
        release_date: '',
        popularity: 2,
      },
      {
        id: 3,
        title: 'Movie C',
        poster_path: '',
        release_date: '',
        popularity: 3,
      },
    ]);
  });

  // Llama al método 'getData' con el número de página correcto cuando se activa 'handlePage'
  it('should call getData with the correct page number when handlePage is triggered', function () {
    spyOn(component, 'getData');
    component.handlePage({ pageIndex: 2 });
    expect(component.getData).toHaveBeenCalled();
  });
  it('should sort moviesData array in descending order by title when option 1 is selected', () => {
    component.orderMovies({ target: { value: '1' } });
    expect(component.moviesData).toEqual([
      {
        id: 3,
        title: 'Movie C',
        poster_path: '',
        release_date: '',
        popularity: 3,
      },
      {
        id: 2,
        title: 'Movie B',
        poster_path: '',
        release_date: '',
        popularity: 2,
      },
      {
        id: 1,
        title: 'Movie A',
        poster_path: '',
        release_date: '',
        popularity: 1,
      },
    ]);
  });

  it('should sort moviesData array in ascending order by title when option 2 is selected', () => {
    component.orderMovies({ target: { value: '2' } });
    expect(component.moviesData).toEqual([
      {
        id: 1,
        title: 'Movie A',
        poster_path: '',
        release_date: '',
        popularity: 1,
      },
      {
        id: 2,
        title: 'Movie B',
        poster_path: '',
        release_date: '',
        popularity: 2,
      },
      {
        id: 3,
        title: 'Movie C',
        poster_path: '',
        release_date: '',
        popularity: 3,
      },
    ]);
  });

  it('should navigate to movie detail page with correct movie ID when clicking on an image', () => {
    const movieId = 123;
    component.onImageClick(movieId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie-detail', movieId]); // Usa routerSpy aquí
  });
});
