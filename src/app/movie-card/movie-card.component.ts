import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Store the movies returned by the API call.
  movies: any[] = [];
  // Set user's username.
  //username = localStorage.getItem('username');
  faves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();

  }

  // Fetch all movies from database.
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Open dialog to show movie description through MovieDescriptionComponent.
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, description },
      width: '400px',
    });
  }

  // Open dialog to show movie genre through MovieGenreComponent.
  openGenreDialog(movieTitle: any, movieGenres: any): void {
    this.fetchApiData.getGenre(movieGenres).subscribe((genre: any) => {
      this.dialog.open(MovieGenreComponent, {
        data: { movieTitle, genre },
        width: '600px',
      });
    });
  } 

  // Open dialog to show movie director through MovieDirectorComponent.
  openDirectorDialog(movieTitle: any, movieDirector: any): void {
    this.fetchApiData.getDirector(movieDirector).subscribe((director: any) => {
      this.dialog.open(MovieDirectorComponent, {
        data: { movieTitle, director },
        width: '600px',
      });
    });
  }

  /**
   * Adds move to users favorites list
  */
   addToFavoriteMoviesList(movieId: any, movieTitle: any): void {
    this.fetchApiData.addMovieFavorites(movieId).subscribe((res: any) => {
      this.snackBar.open(`${movieTitle} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * Removed movie from users favorites list
  */
  removeFromFavorites(movieId: any, movieTitle: any): void {
   this.fetchApiData.removeMovieFavorites(movieId).subscribe((res: any) => {
     this.snackBar.open(`${movieTitle} has been removed from favorties`, 'OK', {
       duration: 3000,
     })
     return this.getUsersFavs();
   })
  }
  /**
   * Returns a list of the users favorites movie._id's
  */

   getUsersFavs(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      //console.log(this.faves);
      return this.faves;
    });
  }
  /**
   * Compares movie id's with getUsersFavs returned list to set the Favorites icon to add/remove correctly
  */
  setFaveStatus(movieId: any): any {
    if (this.faves.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }
}
