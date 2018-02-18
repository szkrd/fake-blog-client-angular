import {Injectable, Optional, SkipSelf} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {HeaderLinkItem} from '../interfaces/header-link-item';

@Injectable()
export class HttpUtilsService {

  constructor() {
  }

  headerLinkItemToHttpParams(params: HeaderLinkItem): HttpParams {
    let httpParams = new HttpParams();

    // unlike set, append will properly construct arrays from same keyed values
    const append = (key, value) => {
      httpParams = httpParams.append(key, String(value));
    };

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach(arrValue => append(key, arrValue));
      } else {
        append(key, value);
      }
    });

    return httpParams;
  }
}
