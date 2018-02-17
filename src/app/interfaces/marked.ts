// technically this is a way of interfacing with the marked library
// but I still need an injectable thin wrapper that I can mock
import {MarkedOptions, parse} from 'marked';

export class Marked {
  parse: (src: string, options?: MarkedOptions) => string = parse;
}
