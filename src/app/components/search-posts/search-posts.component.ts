import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import autoUnsubscribe from '../../utils/auto-unsubscribe.decorator';

@autoUnsubscribe
@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.scss']
})
export class SearchPostsComponent implements OnInit, OnDestroy {
  // input: from route query param
  // output: rerouting

  routeChangeSubscription: Subscription;
  form: FormGroup;
  query: FormControl;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.routeChangeSubscription = this.route
      .queryParams
      .subscribe((params) => {
        this.query.setValue((params['q'] || '').trim().substr(0, 64));
      });
  }

  ngOnDestroy() {}

  createForm() {
    this.query = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(64)
    ]);
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  submit() {
    const queryParams = {q: this.query.value};
    this.router.navigate(['view/posts'], {queryParams});
  }

}
