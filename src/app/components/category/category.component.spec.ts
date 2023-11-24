import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    // Creamos un objeto simulado (spy) de la clase ApiService.
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMoviesDataFilterByGenre',
      'getMoviesGenres',
    ]);
    const movieDataMock = {
      //se espera que devuelva un objeto que se asemeje a los datos getMoviesDataFilterByGenre
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

    apiServiceSpy.getMoviesDataFilterByGenre.and.returnValue(of(movieDataMock));
    const activatedRouteStub = {
      params: of({ id: '18' }), // Proporciona un ID de categoría válido
    };

    const movieGenresMock = [
      // Agrega aquí los géneros de películas que esperas de getMoviesGenres
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
    ];
    apiServiceSpy.getMoviesGenres.and.returnValue(of(movieGenresMock));

    TestBed.configureTestingModule({
      declarations: [CategoryComponent, HeaderComponent],
      providers: [
        // Proporcionamos el servicio simulado en lugar del servicio real.
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
      ],
    });

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // When the user selects option 1, the moviesData array should be sorted in descending order by title.
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
