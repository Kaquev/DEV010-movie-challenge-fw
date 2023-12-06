import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from '../app/components/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../app/components/header/header.component';
import { ApiService } from '../app/services/api.service';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    //objeto mock para ApiService
    const apiServiceSpy = {
      getMovieDetail: jest.fn(),
      getMoviesGenres: jest.fn(),
    };

    // Configurar los valores de retorno esperados para los métodos mockeados si es necesario

    const movieDetailMock = {
      // Agrega aquí los campos que esperas de getMovieDetail
    };
    apiServiceSpy.getMovieDetail.mockReturnValue(of(movieDetailMock));

    const activatedRouteStub = {
      snapshot: {
        paramMap: { get: jest.fn().mockReturnValue('14') },
      },
    };

    const movieGenresMock: { id: number; name: string }[] = [
      // Géneros de películas que esperas de getMoviesGenres
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
    ];
    apiServiceSpy.getMoviesGenres.mockReturnValue(of(movieGenresMock));

    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, HeaderComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
