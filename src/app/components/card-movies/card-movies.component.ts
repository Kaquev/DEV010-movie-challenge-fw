import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieResult } from 'src/app/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-movies',
  templateUrl: './card-movies.component.html',
  styleUrls: ['./card-movies.component.css'],
})
export class CardMoviesComponent implements OnInit {
  public moviesData: MovieResult[] = [];
  public totalPages: number = 0;
  public page_size = 20; // ajusta el tamaño de la página según tus necesidades
  public pageSizeOptions = [10, 20, 30]; // opciones de tamaño de página
  public defaultImg = './../../../assets/images/404.svg';

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() {
    this.getData(1);
  }
  getData(page: number) {
    this.api.getMoviesData(page).subscribe((response: any) => {
      this.totalPages = response.total_pages;
      this.moviesData = response['results'];
    });
  }
  handlePage(event: any) {
    this.getData(event.pageIndex + 1); // pageIndex comienza desde 0, por eso sumamos 1
  }

  orderMovies(event: any) {
    if (event.target.value > '2') {
      this.orderPopularity(1, event.target.value);
    } else {
      if (event.target.value === '2') {
        this.moviesData = this.moviesData.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.moviesData = this.moviesData.sort(function (a, b) {
          if (b.title < a.title) {
            return -1;
          }
          if (b.title > a.title) {
            return 1;
          }
          return 0;
        });
      }
    }
  }
  orderPopularity(page: number, order: string) {
    this.totalPages = 0;
    this.moviesData = [];
    if (order === '3') {
      order = 'desc';
    } else {
      order = 'asc';
    }
    this.api.getMovieByPopularity(page, order).subscribe((response: any) => {
      this.totalPages = response.total_pages;
      this.moviesData = response['results'];
    });
  }
  onImageClick(movieId: number): void {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
