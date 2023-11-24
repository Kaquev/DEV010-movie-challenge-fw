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

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() {
    this.getMoviesGenres();
  }

  /* getMoviesGenres llama al servicio ApiService para obtener
  los géneros de las películas. Luego llama a divideArrayGenres
  para dividir los géneros en grupos.*/
  getMoviesGenres() {
    this.api.getMoviesGenres().subscribe((response: any) => {
      this.moviesGenres = response['genres'];
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
