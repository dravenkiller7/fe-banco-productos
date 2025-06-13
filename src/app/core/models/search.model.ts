import {set} from 'date-fns';
import {DateUtils} from '../utils/date.utils';

export class Search<T> {
  from: Partial<T> = {};
  to: Partial<T> = {};
  like: Partial<T> = {};
  obj: Partial<T> = {};
  not: Partial<T> = {};
  nil: Partial<T> = {};
  in: Record<keyof T, any[]> = {} as any;
  notNil: Partial<T> = {};

  sort: 'asc' | 'desc' = 'asc';
  pageNumber = 0;
  pageSize = 10;

  constructor(init?: Partial<Search<T>>) {
    Object.assign(this, init);
  }

  private formatValue(section: string, value: any): any {
    if (value instanceof Date) {
      let adjustedDate = new Date(value); // Hacemos copia para no mutar el original

      if (section === 'from') {
        adjustedDate = set(adjustedDate, {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
      } else if (section === 'to') {
        adjustedDate = set(adjustedDate, {
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 999
        });
      }

      return DateUtils.convertToUTCString(adjustedDate); // Ya devuelves string UTC limpio
    }
    return value;
  }

  toQueryParams(): Record<string, any> {
    const params: Record<string, any> = {};

    const sections = ['from', 'to', 'like', 'obj', 'not', 'nil', 'notNil'];
    for (const section of sections) {
      const obj = (this as any)[section] as Partial<T>;
      for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
          params[`${section}.${key}`] = this.formatValue(section, obj[key]);
        }
      }
    }

    // In para listas
    for (const key in this.in) {
      if (this.in[key]?.length) {
        params[`in.${key}`] = this.in[key].join(',');
      }
    }

    // Pagination and sorting
    params['sort'] = this.sort || 'asc';
    params['pageNumber'] = this.pageNumber;
    params['pageSize'] = this.pageSize;

    return params;
  }
}
