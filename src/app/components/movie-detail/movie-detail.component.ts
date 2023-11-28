import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  // Propiedad que almacena los detalles de la película
  public movieData: MovieDetail = {
    adult: false,
    backdrop_path: '',
    belongs_to_collection: null,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0.0,
    vote_count: 0,
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute /*se inyectan las dependencias */
  ) {}
  ngOnInit(): void {
    console.log('route params:', this.route.snapshot.params);
    // Verifica que tanto el servicio API como la ruta estén presentes
    if (this.api && this.route) {
      console.log('api service:', this.api);
      console.log('movie id:', this.route.snapshot.params['id']);

      // Llama al servicio para obtener los detalles de la película
      this.api
        .getMovieDetail(this.route.snapshot.params['id'])
        .subscribe((response: any) => {
          console.log('response:', response);
          // Asigna los detalles de la película a la propiedad movieData
          this.movieData = response;
        });
    }
  }
}
