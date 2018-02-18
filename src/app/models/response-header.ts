import {HeaderLink} from '../interfaces/header-link';
import {HttpHeaders} from '@angular/common/http';

const parseLinkHeaderLib = require('parse-link-header');

type ParseLinkHeader = (rawLink: string) => HeaderLink;

export class ResponseHeader {
  link: HeaderLink;

  constructor (
    headers: HttpHeaders,
    parseHeaderLink: ParseLinkHeader = parseLinkHeaderLib
  ) {
    this.link = parseLinkHeaderLib(headers.get('link')) || {};
    this.link.totalCount = parseInt(headers.get('x-total-count'), 10) || 0;
  }
}
