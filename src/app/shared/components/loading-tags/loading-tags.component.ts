import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-tags',
  templateUrl: './loading-tags.component.html',
  styleUrls: ['./loading-tags.component.scss']
})
export class LoadingTagsComponent implements OnInit {

  ngOnInit(): void {}

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
