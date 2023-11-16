import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnDestroy() {
    // Se llama justo antes de que Angular destruya el componente.
  }

  ngAfterViewInit() {
    //  Se ejecuta cuando la vista del componente se ha inicializado por completo.

    // despues de 3 segundos el logo se oculta con display none
    setTimeout(() => {
      const logo = document.getElementById('logo');
      if (logo) {
        logo.style.display = 'none';
      }
    }, 3000);
  }

  ngOnInit() {
    // Se EJECUTa ANTES DE CARGAR EL HTML
  }

}
