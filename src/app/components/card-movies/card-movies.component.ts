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
  /*propiedades del componente */
  public moviesData: MovieResult[] = [];
  public totalPages: number = 0;
  public page_size = 20;
  public pageSizeOptions = [10, 20, 30];
  public defaultImg = './../../../assets/images/404.svg';
  public selected = '';

  constructor(protected api: ApiService, private router: Router) {}

  ngOnInit() {
    if (this.api.filterSelected !== '') {
      this.selected = this.api.filterSelected;
      this.orderPopularity(1, this.api.filterSelected);
    } else {
      this.getData(1);
    }
  }

  // Método para obtener datos de películas
  getData(page: number) {
    this.api.getMoviesData(page).subscribe((response: any) => {
      this.totalPages = response.total_pages;
      this.moviesData = response['results'];
    });
  }

  // Método para manejar cambio de página
  handlePage(event: any) {
    this.getData(event.pageIndex + 1);
  }

  // Método para ordenar películas
  orderMovies(event: any) {
    this.api.filterSelected = event.target.value;
    if (event.target.value === '') {
      this.getData(1);
    } else {
      this.orderPopularity(1, event.target.value);
    }
  }

  // Método para ordenar películas por popularidad
  orderPopularity(page: number, order: string) {
    this.totalPages = 0;
    this.moviesData = [];
    const observable$ = this.api.orderMoviesByPopularity(page, order, 0);

    if (observable$) {
      observable$.subscribe((response: any) => {
        this.totalPages = response.total_pages;
        this.moviesData = response['results'];
      });
    }
  }

  // Método para manejar clic en una imagen de película
  onImageClick(movieId: number): void {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
