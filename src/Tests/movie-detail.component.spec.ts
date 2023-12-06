import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from '../app/components/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let apiService: ApiService;

  let activatedRouteStub;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMovieDetail',
      'getMoviesGenres',
    ]);
    const movieDetailMock = {
      // Agrega aquí los campos que esperas de getMovieDetail
    };
    apiServiceSpy.getMovieDetail.and.returnValue(of(movieDetailMock));

    activatedRouteStub = {
      snapshot: {
        params: { id: '14' }, // Asegúrate de proporcionar un ID válido aquí
      },
    };
    const movieGenresMock: { id: number; name: string }[] = [
      //géneros de películas que esperas de getMoviesGenres
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
    ];
    apiServiceSpy.getMoviesGenres.and.returnValue(of(movieGenresMock));

    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, HeaderComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }, // Incluye el servicio ApiService
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Utiliza TestBed.inject para obtener el servicio
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
