import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API = 'https://api.themoviedb.org/3/';
  private apiKey = '77dad3c9e92f7d762ef6b6c944cca906';
  public filterSelected: string = '';

  constructor(private http: HttpClient) {}

  // Para obtener todo el listado de peliculas
  // parametro es la pagina que quiero
  getMoviesData(page: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL`
    );
  }

  /*Se crea una nueva llamada a la API y se llama al endpoint genre/movie/list
      para obtener los generos de las peliculas, como parametro le pasamos language=es*/
  getMoviesGenres(): Observable<any> {
    return this.http.get(
      `${this.API}/genre/movie/list?language=es&api_key=${this.apiKey}`
    );
  }

  /*Para poder filtrar estos generos
    le estoy pasando como parametro api key, page, language y with_genres */
  getMoviesDataFilterByGenre(page: number, genre: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&with_genres=${genre}`
    );
  }

  getMovieDetail(movieId: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.API}/movie/${movieId}?language=es&api_key=${this.apiKey}`
    );
  }

  getMovieByPopularity(
    page: number,
    order: string,
    genreId: number
  ): Observable<Movie[]> {
    if (genreId === 0) {
      return this.http.get<Movie[]>(
        `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&sort_by=popularity.${order}`
      );
    } else {
      return this.http.get<Movie[]>(
        `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&sort_by=popularity.${order}&with_genres=${genreId}`
      );
    }
  }
}

/* métodos de solicitud HTTP
GET: Se utiliza para solicitar datos de un recurso especificado.
POST: Se utiliza para enviar datos a un servidor para crear un recurso.
PUT: Se utiliza para actualizar un recurso existente con nuevos datos.
DELETE: Se utiliza para eliminar un recurso especificado.
-protocolo HTTP-
 */
