import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMoviesComponent } from './card-movies.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('CardMoviesComponent', () => {
  let component: CardMoviesComponent;
  let fixture: ComponentFixture<CardMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMoviesComponent],
      providers: [ApiService],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MatPaginatorModule],
    });
    fixture = TestBed.createComponent(CardMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
