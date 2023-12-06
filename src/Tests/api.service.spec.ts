import { TestBed } from '@angular/core/testing';
import { ApiService } from '../app/services/api.service';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should retrieve data', () => {
    //   // Ejemplo de cómo podrías simular una llamada HTTP usando jest.spyOn
    //   const getMovieDetailSpy = jest.spyOn(apiService, 'getMovieDetail');
    //   // Puedes simular un valor de retorno para la llamada a getMovieDetail
    //   getMovieDetailSpy.mockReturnValueOnce(/* Tu valor simulado aquí */);
    //   // Llamas a la función que utilizará la llamada HTTP
    //   // Puedes ajustar esto según tus métodos y necesidades específicas
    //   apiService.getMovieDetail(/* Parámetros aquí */);
    //   // Verificas que la función haya sido llamada correctamente
    //   expect(getMovieDetailSpy).toHaveBeenCalled();
    // });
    // Puedes agregar más pruebas para otros métodos del ApiService
  });
});
