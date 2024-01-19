import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HomeService } from "../shared/services/home.service";
import { HomeApiActions, HomePageActions, ProfileApiActions, ProfilePageActions } from "./actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { ArticlePageActions, ArticleApiActions } from "../articles/actions";
import { ProfileService } from "../shared/services/profile.service";

@Injectable()
export class HomeEffects {
  constructor(
    private action$: Actions,
    private homeService: HomeService,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
  ) {}

  // get Tags effect
  getTagsEffect$ = createEffect(() =>{
    return this.action$.pipe(
      ofType(HomePageActions.getTags),
      mergeMap(() => {
        return this.homeService.getTags().pipe(
          map((tags) => {
            return HomeApiActions.getTagsSuucess(tags)
          }),
          catchError((error) => {
            return of(HomeApiActions.getTagsFailure(error))
          })
        )
      })
    )
  })

  // get suggested feed articles
  getSuggestedFedd$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomePageActions.getSuggestedFeed),
      switchMap((action) => {
        return this.homeService.getSuggestedFeed(action.filter).pipe(
          map((articles) => {
            return HomeApiActions.getSuggestedFeedSuccess(articles.articles)
          }),
          catchError((error) => {
            return of(HomeApiActions.getSuggestedFeedFailure(error))
          })
        )
      })
    )
  })

  // get my feed
  getMyFeed$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomePageActions.getMyFeed),
      mergeMap((action) => {
        return this.homeService.getMyFeed().pipe(
          map((articles) => {
            return HomeApiActions.getMyFeedSuccess(articles.articles)
          }),
          catchError((error) => {
            return of(HomeApiActions.getMyFeedFailure(error))
          })
        )
      })
    )
  })


  // favorite an article
  addToFavorite$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomePageActions.favorite),
      mergeMap((action) => {
        return this.homeService.addToFavorite(action.slug).pipe(
          map((article) => {
            return HomeApiActions.favoriteSuccess(article.article)
          }),
          catchError((error) => {
            return of(HomeApiActions.favoriteFailure(error))
          })
        )
      })
    )
  })
  // unfavorite an article
  removeFromFavorite$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomePageActions.unfavorite),
      mergeMap((action) => {
        return this.homeService.removeFromFavorite(action.slug).pipe(
          map((article) => {
            return HomeApiActions.unfavoriteSuccess(article.article)
          }),
          catchError((error) => {
            return of(HomeApiActions.unfavoriteFailure(error))
          })
        )
      })
    )
  })

  // get Profile data
  getProfileData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProfilePageActions.getProfileData),
      exhaustMap((action) => {
        return this.homeService.getProfile(action.username).pipe(
          map((profile) => {
            return ProfileApiActions.getProfileDataSuccess(profile.profile)
          }),
          catchError((error) => {
            return of(ProfileApiActions.getProfileDataFailure(error))
          })
        )
      })
    )
  })

  // get Personal articles
  getPersonalArticles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProfilePageActions.getPersonalArticles),
      mergeMap((action) => {
        return this.homeService.getSuggestedFeed({author:action.username}).pipe(
          map((articles) => {
            return ProfileApiActions.getPersonalArticlesSuccess(articles.articles)
          }),
          catchError((error) => {
            return of(ProfileApiActions.getPersonalArticlesFailure(error))
          })
        )
      })
    )
  })

  // get favorited articles
  getFavoritedArticles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProfilePageActions.getPersonalArticles),
      mergeMap((action) => {
        return this.homeService.getSuggestedFeed({favorited:action.username}).pipe(
          map((articles) => {
            return ProfileApiActions.getFavoritedArticlesSuccess(articles.articles)
          }),
          catchError((error) => {
            return of(ProfileApiActions.getFavoritedArticlesFailure(error))
          })
        )
      })
    )
  })

  // follow n user
  followUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProfilePageActions.Follow),
      mergeMap((action) => {
        return this.profileService.followUser(action.username).pipe(
          map((profile) => {
            return ProfileApiActions.FollowSuccess(profile)
          }),
          catchError((error) => {
            return of(ProfileApiActions.FollowFailure(error))
          })
        )
      })
    )
  })
  // unfollow a user
  unfollowUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProfilePageActions.UnFollow),
      mergeMap((action) => {
        return this.profileService.unfollowUser(action.username).pipe(
          map((profile) => {
            return ProfileApiActions.unFollowSuccess(profile)
          }),
          catchError((error) => {
            return of(ProfileApiActions.unFollowFailure(error))
          })
        )
      })
    )
  })

}