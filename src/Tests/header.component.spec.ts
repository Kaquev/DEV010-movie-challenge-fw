import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../app/components/header/header.component';
import { ApiService } from '../app/services/api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    // objeto mock para ApiService
    const apiServiceSpy = {
      getMoviesGenres: jest.fn(() => of({ genres: [] })),
    };
    const movieGenresMock = {
      genres: [],
    };
    apiServiceSpy.getMoviesGenres.mockReturnValue(of(movieGenresMock));

    const activatedRouteStub = {
      params: of({ id: '14' }), // Proporciona un ID de género válido
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
