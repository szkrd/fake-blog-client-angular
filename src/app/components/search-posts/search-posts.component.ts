import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.scss']
})
export class SearchPostsComponent implements OnChanges {
  @Input('query') defaultQuery = '';

  form: FormGroup;
  query: FormControl;

  constructor (private formBuilder: FormBuilder) {
    this.createForm();
  }

  // parent -> child
  // (the route may do a soft change, so ngOnInit is not enough)
  ngOnChanges (changes) {
    if (changes.defaultQuery) {
      this.query.setValue(this.defaultQuery);
    }
  }

  createForm () {
    this.query = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64)
    ]);
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  // child -> parent
  submit () {
    // this.queryEmitter.emit(this.query.value);
    console.log('TODO');
  }

}
