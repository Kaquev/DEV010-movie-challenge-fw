import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResult } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public moviesData: MovieResult[] = [];
  public totalPages: number = 0;
  public page_size = 20; // ajusta el tamaño de la página según tus necesidades
  public pageSizeOptions = [10, 20, 30]; // opciones de tamaño de página
  public defaultImg = './../../../assets/images/404.svg'; //img por defecto

  constructor(
    /*se inyectan las dependencias*/
    private api: ApiService, //para obtener datos de películas
    private route: ActivatedRoute, //para acceder a los parámetros de la ruta
    private router: Router //para la navegación
  ) {}

  /*cuando se inicializa el componente (ngOnInit)
  suscribe a los parámetros de la ruta y se llama a `getData`
  para obtener los datos de la película. */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const genreId = params['id'];
      if (genreId !== undefined) {
        this.totalPages = 0;
        this.moviesData = [];
        this.getData(1, genreId);
      }
    });
  }

  /* getData llama al servicio ApiService para obtener los datos
  de la película filtrados por género. */
  getData(page: number, genre: number) {
    this.api
      .getMoviesDataFilterByGenre(page, genre)
      .subscribe((response: any) => {
        this.totalPages = response.total_pages;
        this.moviesData = response['results'];
      });
  }

  /*Este método se llama cuando el
  usuario cambia de página, LLama a getData con el nuevo número de página. */
  handlePage(event: any) {
    const genreId = this.route.snapshot.params['id'];
    if (genreId) {
      this.getData(event.pageIndex + 1, genreId);
    }
  }

  /*cuando el usuario selecciona una opción de ordenación.
  este metodo odena los datos de la película en segun de la opción seleccionada.*/
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

  /* Método para ordenar películas por popularidad.
  Llama al servicio ApiService para obtener los datos ordenados. */
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

  /* Método para manejar clic en una imagen de película
  y navegar a los detalles de la película. */
  onImageClick(movieId: number): void {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
