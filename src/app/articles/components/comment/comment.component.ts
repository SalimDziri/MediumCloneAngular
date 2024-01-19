import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Comment } from 'src/app/shared/models/comment.model';
import { GlobalState, selectArticleAddingComments, selectArticleDeletingComments, selectAuthUser } from 'src/app/shared/state';
import { ArticlePageActions } from '../../actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentCtrl!: FormControl
  commentForm!: FormGroup

  currentUser$ = this.store.select(selectAuthUser)
  loadingDeleteComment$ = this.store.select(selectArticleDeletingComments)
  loadingAddingComment$ = this.store.select(selectArticleAddingComments)

  @Input() content!: 'form' | 'list' 
  @Input() commentData?: Comment
  @Input() slug!:string

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.commentCtrl = this.formBuilder.control('',Validators.required)
    this.commentForm = this.formBuilder.group({
      myComment: this.commentCtrl
    })
  }

  goToAuthor(username?:string){
    this.router.navigateByUrl(`profile/${username}`)
  }

  delete(id?:number){
    this.store.dispatch(ArticlePageActions.deleteComments(this.slug ,id!))
  }

  addComment(comment:string){
    let commentRequet = {comment:{body:comment}}
    this.store.dispatch(ArticlePageActions.addComment(this.slug,commentRequet))
    this.commentCtrl.reset()
  }

}
