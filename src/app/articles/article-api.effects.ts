import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { ArticleApiActions, ArticlePageActions } from "./actions";
import { ArticleService } from "../shared/services/article.service";
import { HomeService } from "../shared/services/home.service";
import { ProfileService } from "../shared/services/profile.service";
import { GlobalState } from "../shared/state";
import { Store } from "@ngrx/store";

@Injectable()
export class ArticleEffects {
  constructor(
    private action$: Actions,
    private articleService: ArticleService,
    private homeService: HomeService,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private store: Store<GlobalState>
  ) {}

  // get Article effects
  getArticleDetaildEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.loadArticleDetails),
      exhaustMap((action) => {
        return this.articleService.getArticle(action.slug).pipe(
          map((article) => {
            return ArticleApiActions.loadArticleDetailsSuccess(article)
          }),
          catchError((error) => {
            return of(ArticleApiActions.loadArticleDetailsFailure(error))
          })
        )
      })
    )
  })


  // favorite an article
  addToFavorite$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.favorite),
      mergeMap((action) => {
        return this.homeService.addToFavorite(action.slug).pipe(
          map((article) => {
            return ArticleApiActions.favoriteSuccess(article)
          }),
          catchError((error) => {
            return of(ArticleApiActions.favoriteFailure(error))
          })
        )
      })
    )
  })
  // unfavorite an article
  removeFromFavorite$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.unfavorite),
      mergeMap((action) => {
        return this.homeService.removeFromFavorite(action.slug).pipe(
          map((article) => {
            return ArticleApiActions.unfavoriteSuccess(article)
          }),
          catchError((error) => {
            return of(ArticleApiActions.unfavoriteFailure(error))
          })
        )
      })
    )
  })

  // follow n user
  followUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.Follow),
      mergeMap((action) => {
        return this.profileService.followUser(action.username).pipe(
          map((profile) => {
            return ArticleApiActions.FollowSuccess(profile)
          }),
          catchError((error) => {
            return of(ArticleApiActions.FollowFailure(error))
          })
        )
      })
    )
  })
  // unfollow a user
  unfollowUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.UnFollow),
      mergeMap((action) => {
        return this.profileService.unfollowUser(action.username).pipe(
          map((profile) => {
            return ArticleApiActions.unFollowSuccess(profile)
          }),
          catchError((error) => {
            return of(ArticleApiActions.unFollowFailure(error))
          })
        )
      })
    )
  })

  // delete a comment
  deleteComment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.deleteComments),
      exhaustMap((action) => {
        return this.articleService.delteComment(action.slug ,action.id).pipe(
          map(() => {
            return ArticleApiActions.deleteCommentsSuccess(action.id)
          }),
          catchError((error) => {
            return of(ArticleApiActions.deleteCommentsFailure(error))
          })
        )
      })
    )
  })

  addComment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ArticlePageActions.addComment),
      exhaustMap((action) => {
        console.log('requested comment =' +action.commentRequest)
        return this.articleService.createComment(action.slug,action.commentRequest).pipe(
          map((comment) => {
            return ArticleApiActions.addCommentSuccess(comment.comment)
          }),
          catchError((error) => {
            return of(ArticleApiActions.addCommentFailure(error))
          })
        )
      })
    )
  })

}