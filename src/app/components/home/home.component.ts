import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnDestroy() {
    // YO ME EJECUTO SIEMPRE CUANDO EL COMPONENTE SE DESTRUYE
  }

  ngAfterViewInit() {
    // YO ME EJECUTO DESPUES DE TENER EL HTML CARGADO, CUANDO YA LA VISTA SE VE EN LA PANTALLA

    // despues de 3 segundos el logo se oculta con display none
    setTimeout(() => {
      const logo = document.getElementById('logo');
      if (logo) {
        logo.style.display = 'none';
      }
    }, 3000);
  }

  ngOnInit() {
    // YO ME EJECUTO ANTES DE CARGAR EL HTML
  }

}
