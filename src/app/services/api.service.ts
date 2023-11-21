import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

    private API = 'https://api.themoviedb.org/3/';
    private apiKey = '77dad3c9e92f7d762ef6b6c944cca906';

    constructor(
        private http: HttpClient
    ) {}

    // esto es para obtener todo el listado de peliculas
    // parametro es la pagina que quiero
    getMoviesData(page: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL`);
    }

    // estamos creando una nueva llamada a la API y llamamos al endpoint genre/movie/list
    // como parametro le pasamos language=es
    getMoviesGenres(): Observable<any> {
        return this.http.get(`${this.API}/genre/movie/list?language=es&api_key=${this.apiKey}`);
    }

    // le estoy pasando como parametro api key, page, language y with_genres
    getMoviesDataFilterByGenre(page: number, genre: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&with_genres=${genre}`);
    }

}