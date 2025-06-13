import {IApiBaseService} from './api-base-service.interface';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

export abstract class ApiBaseService<T, U> implements IApiBaseService<T, U> {
  constructor(
    protected httpClient: HttpClient,
    protected url: string
  ) {
  }

  getList(): Observable<any> {
    return this.httpClient.get(`${this.url}`, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  create(entity: U): Observable<T> {
    return this.httpClient.post(`${this.url}`, entity, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  update(entity: U, identity: string): Observable<T> {
    return this.httpClient.put(`${this.url}/${identity}`, entity, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  read(identity: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${identity}`, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  delete(identity: string): Observable<T> {
    return this.httpClient.delete(`${this.url}/${identity}`, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  verifyId(identity: string): Observable<any> {
    return this.httpClient.get(`${this.url}/verification/${identity}`, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.body as any),
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => error.status);
  }
}
