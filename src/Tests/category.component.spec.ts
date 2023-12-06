import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from '../app/components/category/category.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { ApiService } from '../app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const routerSpy = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent, HeaderComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getMovieDetail: jest.fn(),
            getMoviesGenres: jest.fn(),
            orderMoviesByPopularity: jest.fn(),
            getMoviesDataFilterByGenre: jest.fn(),
          },
        },
        { provide: ActivatedRoute, useValue: { params: of({ id: '18' }) } },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
