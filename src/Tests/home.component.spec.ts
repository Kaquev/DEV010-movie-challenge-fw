import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '../app/components/home/home.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { CardMoviesComponent } from '../app/components/card-movies/card-movies.component';
import { ApiService } from '../app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, CardMoviesComponent],
      providers: [ApiService],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
