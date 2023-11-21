import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public moviesGenres: any;

  constructor(
    private api: ApiService
  ) {}
  ngOnInit() {
    this.getMoviesGenres();
  }
  getMoviesGenres() {
    this.api.getMoviesGenres().subscribe((response: any) => {
      this.moviesGenres = response["genres"];
    });
  }

}
