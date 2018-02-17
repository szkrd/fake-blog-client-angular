import {Component, OnInit} from '@angular/core';
import {TagsService} from '../../services/tags.service';
import {WidgetTag} from '../../interfaces/widget-tag';

const sortByTagName = (a: WidgetTag, b: WidgetTag) => a.name.localeCompare(b.name);

@Component({
  selector: 'app-tag-cloud-widget',
  templateUrl: './tag-cloud-widget.component.html',
  styleUrls: ['./tag-cloud-widget.component.scss']
})
export class TagCloudWidgetComponent implements OnInit {
  items: WidgetTag[] = [];

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.tagsService.getTags()
      .subscribe(response => this.items = response.sort(sortByTagName));
  }

}
