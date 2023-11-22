import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResult } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public moviesData: MovieResult[] = [];
  public totalPages: number = 0;
  public page_size = 20; // ajusta el tamaño de la página según tus necesidades
  public pageSizeOptions = [10, 20, 30]; // opciones de tamaño de página

  constructor(
    private api: ApiService,
    private route: ActivatedRoute  /*se inyectan las dependencias */
  ) {}

  /*cuando se inicializa el componente (ngOnInit)
  suscribe a los parámetros de la ruta y se llama a `getData`
  para obtener los datos de la película. */
  ngOnInit() {
    this.route.params.subscribe((response) => {
      this.totalPages = 0;
      this.moviesData = [];
      this.getData(1, response["id"]);
    });
  }

  /* getData llama al servicio ApiService para obtener los datos
  de la película filtrados por género. */
  getData(page: number, genre: number) {
    this.api.getMoviesDataFilterByGenre(page, genre).subscribe((response: any) => {
      this.totalPages = response.total_pages;
      this.moviesData = response['results'];
    });
  }

  /*Este método se llama cuando el
  usuario cambia de página, LLama a getData con el nuevo número de página. */
  handlePage(event: any) {
    this.getData(event.pageIndex + 1, this.route.snapshot.params["id"]); // pageIndex comienza desde 0, por eso sumamos 1
  }


  /*cuando el usuario selecciona una opción de ordenación.
  este metodo odena los datos de la película en segun de la opción seleccionada.*/
  orderMovies(event: any) {
    if (event.target.value === '2') {
      console.log('entro al numero 2');
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
