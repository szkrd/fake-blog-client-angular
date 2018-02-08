import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {MarkedOptions, parse} from 'marked';

export class Marked {
  parse: (src: string, options?: MarkedOptions) => string = parse;
}

@Directive({
  selector: '[appMarkdown]',
  providers: [Marked]
})
export class MarkdownDirective implements OnChanges, OnInit {
  @Input('appMarkdown') text: string;

  constructor(private el: ElementRef, private marked: Marked) {
  }

  ngOnInit() {
    this.el.nativeElement.classList.add('markdown-body');
  }

  ngOnChanges(changes) {
    if (changes.text) {
      this.el.nativeElement.innerHTML = this.marked.parse(changes.text.currentValue);
    }
  }
}
