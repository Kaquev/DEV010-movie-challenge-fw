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
  public selected = '';

  constructor(
    protected api: ApiService,
    private route: ActivatedRoute /*se inyectan las dependencias */,
    private router: Router
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
        if (this.api.filterSelected !== '') {
          this.selected = this.api.filterSelected;
          this.orderPopularity(1, this.api.filterSelected);
        } else {
          this.getData(1, genreId);
        }
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
    this.api.filterSelected = event.target.value;
    if (event.target.value === '') {
      this.getData(1, this.route.snapshot.params['id']);
    } else {
      this.orderPopularity(1, event.target.value);
    }
  }
  orderPopularity(page: number, order: string) {
    this.totalPages = 0;
    this.moviesData = [];
    this.api
      .orderMoviesByPopularity(page, order, this.route.snapshot.params['id'])
      .subscribe((response: any) => {
        this.totalPages = response.total_pages;
        this.moviesData = response['results'];
      });
  }

  onImageClick(movieId: number): void {
    this.router.navigate(['/movie-detail', movieId]);
  }
}
