import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getMoviesGenres']);

  beforeEach(() => {
    const movieGenresMock = {
      genres: [],
    };
    apiServiceSpy.getMoviesGenres.and.returnValue(of(movieGenresMock));
    const activatedRouteStub = {
      params: of({ id: '14' }), // Proporciona un ID de genero válido
    };
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
