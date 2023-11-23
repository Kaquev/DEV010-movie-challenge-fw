import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    // Creamos un objeto simulado (spy) de la clase ApiService.
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMoviesDataFilterByGenre',
      'getMoviesGenres',
    ]);
    const movieDataMock = {
      //se espera que devuelva un objeto que se asemeje a los datos getMoviesDataFilterByGenre
      total_pages: 1,
      results: [],
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
      ],
    });

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    // Obtenemos una instancia del servicio simulado.
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
