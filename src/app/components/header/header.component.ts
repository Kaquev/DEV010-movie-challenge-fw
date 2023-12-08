import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public moviesGenres: any;
  public genresSeparates: any = [];
  constructor(protected api: ApiService, private router: Router) {}
  ngOnInit() {
    this.getMoviesGenres(); //
  }

  /* Método para obtener los géneros de las películas.
  Llama al servicio ApiService y luego divide
  los géneros en grupos. */
  getMoviesGenres() {
    this.api.getMoviesGenres().subscribe((response: any) => {
      this.moviesGenres = response['genres'];
    });
  }

  // Método para navegar a la página de inicio
  goHome() {
    this.api.filterSelected = '';
    this.router.navigate(['/']);
  }
}
