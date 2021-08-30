import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-21.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

    // User login (Endpoint: 'login', Method: POST).
    public userLogin(userDetails: any): Observable<any> {
      // Send the any argument to the API endpoint and return the API response.
      return this.http
        .post(apiUrl + 'login', userDetails)
        .pipe(catchError(this.handleError));
    }
  
    // Get user (Endpoint: 'users/:username', Method: GET).
    public getUser(username: any): Observable<any> {
      
      return this.http
        .get(apiUrl + `users/${username}`)
        .pipe(catchError(this.handleError));
    }
  
    // Edit user (Endpoint: 'users/:username', Method: PUT).
    public editUser(userDetails: any): Observable<any> {
      
      return this.http
        .put(apiUrl + `users/${userDetails.username}`, userDetails )
        .pipe(catchError(this.handleError));
    }
  
    // Delete user (Endpoint: 'users/:username', Method: DELETE).
    public deleteUser(username: any): Observable<any> {
    
      return this.http
        .delete(apiUrl + `users/${username}`)
        .pipe(catchError(this.handleError));
    }
  
    // Get Favorites list (Endpoint: 'users/:username/favorites', Method: GET).
    public getFavorites(username: any): Observable<any> {
      
      return this.http
        .get(apiUrl + `users/${username}/favorites`)
        .pipe(catchError(this.handleError));
    }
  
    // Add movie to Favorites list (Endpoint: 'users/:username/movies/:movie_id', Method: POST).
    public addMovieFavorites(username: any, movieId: any): Observable<any> {
      
      return this.http
        .post(apiUrl + `users/${username}/movies/${movieId}`)
        .pipe(catchError(this.handleError));
    }
  
    // Remove movie from Favorites list (Endpoint: 'users/:username/movies/:movie_id', Method: DELETE).
    public removeMovieFavorites(username: any, movieId: any): Observable<any> {
      
      return this.http
        .delete(apiUrl + `users/${username}/movies/${movieId}`)
        .pipe(catchError(this.handleError));
    }

  
    // Get all movies endpoint (Endpoint: 'movies', Method: GET).
    public getAllMovies(): Observable<any> {
      
      return this.http
        .get(apiUrl + 'movies')
        .pipe(catchError(this.handleError));
    }
  
    // Get one movie endpoint (Endpoint: 'movies/:title', Method: GET).
    public getMovie(movieTitle: any): Observable<any> {
      
      return this.http
        .get(apiUrl + `movies/${movieTitle}`)
        .pipe(catchError(this.handleError));
      }
  
    // Get one genre endpoint (Endpoint: 'genres/:name', Method: GET).
    public getGenre(genreName: any): Observable<any> {
      
      return this.http
        .get(apiUrl + `genres/${genreName}`)
        .pipe(catchError(this.handleError));
    }
  
    // Get one director endpoint (Endpoint: 'directors/:name', Method: GET).
    public getDirector(directorName: any): Observable<any> {
      
      return this.http
        .get(apiUrl + `directors/${directorName}`)
        .pipe(catchError(this.handleError));
    }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}