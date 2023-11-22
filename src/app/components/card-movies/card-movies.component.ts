import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieResult } from 'src/app/models/movie.model';


@Component({
  selector: 'app-card-movies',
  templateUrl: './card-movies.component.html',
  styleUrls: ['./card-movies.component.css']
})


export class CardMoviesComponent implements OnInit {
  public moviesData: MovieResult[] = [];
  public totalPages: number = 0;
  public page_size = 20; // ajusta el tamaño de la página según tus necesidades
  public pageSizeOptions = [10, 20, 30]; // opciones de tamaño de página

  constructor(
    private api: ApiService
  ) {}
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
