import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMovieDetail',
      'getMoviesGenres',
      'orderMoviesByPopularity',
      'getMoviesDataFilterByGenre',
    ]);
    const movieDataMock = {
      total_pages: 1,
      results: [
        {
          id: 1,
          title: 'Movie A',
          poster_path: '',
          release_date: '',
          popularity: 1,
        },
      ],
    };

    apiServiceSpy.getMoviesDataFilterByGenre.and.returnValue(of(movieDataMock));

    const movieGenresMock = [
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
    ];
    apiServiceSpy.getMoviesGenres.and.returnValue(of(movieGenresMock));

    TestBed.configureTestingModule({
      declarations: [CategoryComponent, HeaderComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: '18' }) } },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
      ],
    });

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
