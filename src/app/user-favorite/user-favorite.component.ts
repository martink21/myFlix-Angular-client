import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
})
export class UserFavoriteComponent implements OnInit {
  // Store the favorites movies returned by the API call.
  movies: any[] = [];
  // Set user's username.
  user: any = {};
  faves: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getUsersFavs(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      console.log(this.faves);
      return this.faves;
    });
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res ;
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { 
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites(); // Calls the filter function when calling movies to show only favorites
    });
  }

  /**
   * Filters movies to display only the users favorites
  */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.faves.includes(movie._id)) {
        this.favorites.push(movie);
      }//console.log(this.favorites);
    });
    return this.favorites; // Calls a reload for a dynamic removal from list
  }

  addToFavoriteMoviesList(movieId: any, movieTitle: any): void {
    this.fetchApiData.addMovieFavorites(movieId).subscribe((res: any) => {
      //let favMovies = res.Favorites;
      this.snackBar.open(`${movieTitle} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  removeFromFavorites(movieId: any, movieTitle: any): void {
   this.fetchApiData.removeMovieFavorites(movieId).subscribe((res: any) => {
     //let favMovies = res.Favorites;
     this.snackBar.open(`${movieTitle} has been removed from favorties`, 'OK', {
       duration: 3000,
     })
     setTimeout(function () {
      window.location.reload();
     }, 3500);
     return this.getUsersFavs();
   })
  }

  /**
   * Allows for dynamic loading of favorites icon to display on/off of favorites
  */
  setFaveStatus(movieId: any): any {
    if (this.faves.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Open dialog to show movie description through MovieDescriptionComponent
   * @param title
   * @param description
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, description },
      width: '400px',
    });
  }

  /**
   * Open dialog to show movie genre through MovieGenreComponent
   * @param movieTitle
   * @param movieGenres
   */
  openGenreDialog(movieTitle: any, movieGenres: any): void {
    this.fetchApiData.getGenre(movieGenres/*[0]*/).subscribe((genre: any) => {
      this.dialog.open(MovieGenreComponent, {
        data: { movieTitle, genre },
        width: '600px',
      });
    });
  }

  /**
   * Open dialog to show movie director through MovieDirectorComponent
   * @param movieTitle
   * @param movieDirector
   */
  openDirectorDialog(movieTitle: any, movieDirector: any): void {
    this.fetchApiData.getDirector(movieDirector).subscribe((director: any) => {
      this.dialog.open(MovieDirectorComponent, {
        data: { movieTitle, director },
        width: '600px',
      });
    });
  }
}