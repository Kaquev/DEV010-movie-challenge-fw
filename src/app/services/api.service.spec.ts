import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Movie, MovieDetail, MovieResult } from '../models/movie.model';
import { of, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMovieDetail',
      'getMoviesGenres',
      'orderMoviesByPopularity',
    ]);

    apiServiceSpy.orderMoviesByPopularity.and.returnValue(
      of(/* respuesta mock aquí */)
    );

    // ...

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient); // Agrega esta línea para inyectar HttpClient
  });

  //GetMovieData
  it('Devuelve un observable de tipo Película[] cuando se le proporciona un número de página válido.', function () {
    const page = 1;
    const expectedUrl = `${apiService['API']}/discover/movie?api_key=${apiService['apiKey']}&page=${page}&language=es-CL`;
    spyOn(apiService['http'], 'get').and.returnValue(of([]));

    const result = apiService.getMoviesData(page);

    expect(apiService['http'].get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(jasmine.any(Observable));
  });

  //getMoviesGenres
  it('debería devolver un observable con los datos esperados cuando la llamada API sea exitosa', function () {
    // Arrange
    const expectedData = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ];
    spyOn(apiService['http'], 'get').and.returnValue(of(expectedData));

    // Act
    const result = apiService.getMoviesGenres();

    // Assert
    result.subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
  });

  //getMoviesDataFilterByGenre
  it('debe devolver un Observable de película [] cuando se le proporciona un número de página válido y una identificación de género', function (this: any) {
    // Arrange
    const page = 1;
    const genre = 28;
    const expectedUrl = `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&with_genres=${genre}`;

    // Act
    const result = apiService.getMoviesDataFilterByGenre(page, genre);

    // Assert
    expect(result).toBeInstanceOf(Observable);
    expect(apiService['http'].get).toHaveBeenCalledWith(expectedUrl);
  });

  //getMoviesDataFilterByGenre
  it('Debería construir la URL de la API correctamente', () => {
    const page = 1;
    const genre = 28;

    apiService.getMoviesDataFilterByGenre(page, genre).subscribe(() => {
      const expectedUrl = `${apiService['API']}/discover/movie?api_key=${apiService['apiKey']}&page=${page}&language=es-CL&with_genres=${genre}`;
      expect(apiService['http'].get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  //getMoviesDataFilterByGenre
  it('debería devolver un observable vacío de Película[] cuando no se encuentren películas para el ID de género dado', function () {
    // Arrange
    const page = 1;
    const genre = 1;
    const expectedUrl = `${apiService['API']}/discover/movie?api_key=${apiService['apiKey']}&page=${page}&language=es-CL&with_genres=${genre}`;
    const expectedResponse: Movie[] = []; // Datos de respuesta vacía

    spyOn(apiService['http'], 'get').and.returnValue(of(expectedResponse));

    // Act
    const result = apiService.getMoviesDataFilterByGenre(page, genre);

    // Assert
    expect(apiService['http'].get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(of(expectedResponse)); // Puedes usar 'of' para envolver el resultado esperado
  });

  //getMovieDetail
  it('debería devolver un observable de tipo MovieDetail', function (this: any) {
    const movieId = 123;
    const expectedUrl = `${this.API}/movie/${movieId}?language=es&api_key=${this.apiKey}`;

    // Mock de HttpClient
    const httpClient: Partial<HttpClient> = {
      get: jasmine.createSpy('get').and.returnValue(of({})),
    };

    const result = apiService.getMovieDetail(movieId);

    expect(result).toBeInstanceOf(Observable);
    expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
  });

  //orderMoviesByPopularity
  it("debe llamar a la API con la URL correcta que contiene el parámetro 'sort_by' establecido en 'popularity.asc' cuando el parámetro de orden es '2' y el géneroId es '0'", function (this: any) {
    // Arrange
    const page = 1;
    const order = '2';
    const genreId = 0;
    const expectedUrl = `${this.API}/discover/movie?api_key=${this.apiKey}&page=${page}&language=es-CL&sort_by=popularity.asc`;

    // Act
    const httpSpy = spyOn(httpClient, 'get');
    apiService.orderMoviesByPopularity(page, order, genreId);

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(expectedUrl);
  });
});
