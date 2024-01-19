import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ArticleService } from 'src/app/shared/services/article.service';
import { GlobalState, selectAuthUser } from 'src/app/shared/state';

import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  loggedUser$ = this.store.select(selectAuthUser)

  titleCtrl!: FormControl
  descriptionCtrl!: FormControl
  bodyCtrl!: FormControl
  tagsCtrl!: FormControl

  addArticleForm!: FormGroup

  // operation type
  operation:string = 'update' || 'new'

  // material chips
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tagList: string[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.selectOperation(this.getSlug())
  }

  initForm(article?: Article){
    if(article?.tagList){this.tagList = article.tagList }
    this.titleCtrl = this.formBuilder.control(article?.title,Validators.required)
    this.descriptionCtrl = this.formBuilder.control(article?.description,Validators.required)
    this.bodyCtrl = this.formBuilder.control(article?.body,Validators.required)
    this.tagsCtrl = this.formBuilder.control(this.tagList)

    this.addArticleForm = this.formBuilder.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      body: this.bodyCtrl,
      tags: this.tagsCtrl
    })
  }

  getSlug():string {
    let currentNavigation = this.router.url
    // all url will start with '/articles/' which need to be sliced
    let sliced = currentNavigation.slice(12)
    return decodeURIComponent(sliced)
  }

  selectOperation(slug:string){
    if(slug == ''){
      this.operation = 'new'
    }else{
      this.operation = 'update'
    }
  }

  create(){
    if(this.addArticleForm.valid){
      console.log('created a new article '+this.tagList)
    }
  }

  update(){
    if(this.addArticleForm.valid){
      console.log('updated an existing article')
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new tag
    if (value) {
      this.tagList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

}