export interface Movie {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  popularity: number;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  genres: any[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
/* En este código, he definido una interfaz que sirve
como un contrato para manipular mi API.
Esta interfaz establece las propiedades y
métodos que deben ser implementados por cualquier
clase que desee interactuar con la API en este contexto
específico.*/
