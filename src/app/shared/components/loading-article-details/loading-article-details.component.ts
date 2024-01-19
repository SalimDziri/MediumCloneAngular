import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-article-details',
  templateUrl: './loading-article-details.component.html',
  styleUrls: ['./loading-article-details.component.scss']
})
export class LoadingArticleDetailsComponent implements OnInit {

  @Input() content!:string

  constructor() { }

  ngOnInit(): void {

  }

}
