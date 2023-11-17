import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

    private API = 'https://api.themoviedb.org/3/';
    private apiKey = '77dad3c9e92f7d762ef6b6c944cca906';

    constructor(
        private http: HttpClient
    ) {}

    getMoviesData(page: number) : Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}`);
    }


}