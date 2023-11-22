import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public moviesGenres: any;
  public genresSeparates: any = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getMoviesGenres();
  }
  getMoviesGenres() {
    this.api.getMoviesGenres().subscribe((response: any) => {
      this.moviesGenres = response["genres"];
      this.divideArrayGenres();
    });
  }

  /* se toma el arreglo original y de divide en 3 partes iguales
  (ya que sabemos el largo del arreglo que es 19)
  entonces podemos definir el primer arreglo de 7, el segundo de 7 y el tercero lo restante (5)
  los guardamos todos en una arreglo mas grande, para poder iterar el arreglo padre y luego
  el arreglo hijo
  PADRE = genresSeparates (para iterar por las 3 secciones)
  HIJO = es cada parte del arreglo (0, 1 y la 2)
  */
  divideArrayGenres() {
    this.genresSeparates.push(this.moviesGenres.slice(0, 7));
    this.genresSeparates.push(this.moviesGenres.slice(7, 14));
    this.genresSeparates.push(this.moviesGenres.slice(14, 20));
    console.log(this.genresSeparates);
  }

  goHome() {
    this.router.navigate(["/"]);
  }

}
