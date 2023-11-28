import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    /*La primera ruta ('') apunta al componente
    HomeComponent y representa la ruta principal (ruta raíz) */
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    /* utiliza un parámetro :id y
    apunta al componente CategoryComponent.*/
  },
  {
    path: 'movie-detail/:id',
    component: MovieDetailComponent,
    /* también utiliza un parámetro :id y
    apunta al componente MovieDetailComponent */
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
/*@NgModule: Es un decorador que se utiliza para configurar el módulo.
imports: Se utiliza para importar otros módulos necesarios.
En este caso, se importa RouterModule configurado con las rutas definidas.
exports: Se utiliza para hacer que las directivas, pipes o módulos estén disponibles
para otros módulos de la aplicación. En este caso, se exporta RouterModule
para que pueda ser utilizado en otros lugares de la aplicación. */
