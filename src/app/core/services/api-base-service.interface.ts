import {Observable} from 'rxjs';

export interface IApiBaseService<T, U> {
  getList(): Observable<any>;

  create(entity: U): Observable<T>;

  read(identity: string): Observable<any>;

  update(entity: U, identity: string): Observable<T>;

  delete(identity: string): Observable<T>;
}
