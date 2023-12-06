// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CardMoviesComponent } from '../app/components/card-movies/card-movies.component';
// import { ApiService } from '../app/services/api.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// describe('CardMoviesComponent', () => {
//   let component: CardMoviesComponent;
//   let fixture: ComponentFixture<CardMoviesComponent>;
//   let apiServiceMock: jest.Mocked<ApiService>;
//   let routerMock: jest.Mocked<Router>;

//   beforeEach(() => {
//     apiServiceMock = {
//       getMoviesDataFilterByGenre: jest.fn(),
//       orderMoviesByPopularity: jest.fn(),
//     } as jest.Mocked<ApiService>;

//     routerMock = {
//       navigate: jest.fn(),
//     } as jest.Mocked<Router>;

//     TestBed.configureTestingModule({
//       declarations: [CardMoviesComponent],
//       providers: [
//         { provide: ApiService, useValue: apiServiceMock },
//         { provide: Router, useValue: routerMock },
//       ],
//       imports: [
//         HttpClientTestingModule,
//         BrowserAnimationsModule,
//         MatPaginatorModule,
//         CommonModule,
//         FormsModule,
//       ],
//     });

//     fixture = TestBed.createComponent(CardMoviesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
