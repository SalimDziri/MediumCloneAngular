import { createAction } from "@ngrx/store"
import { ArticleDetailsResponse, mergedArticleDataResponse } from "src/app/shared/models/article.model"
import { Comment } from "src/app/shared/models/comment.model"
import { ProfileModel } from "src/app/shared/models/profile.model"

export const loadArticleDetailsSuccess = createAction(
  '[Article Api] Load Article Details Successful',
  (article: mergedArticleDataResponse) => ({article})
)
export const loadArticleDetailsFailure = createAction(
  '[Article Api] Load Article Details Failure',
  (error: string) => ({error})
)


// Toggle Favorite
export const favoriteSuccess = createAction(
  '[Article Api] Favorite Success',
  (article: ArticleDetailsResponse) => ({article})
)

export const favoriteFailure = createAction(
  '[Article Api] Favorite Failure',
  (error:string) => ({error})
)

export const unfavoriteSuccess = createAction(
  '[Article Api] unFavorite Success',
  (article: ArticleDetailsResponse) => ({article})
)

export const unfavoriteFailure = createAction(
  '[Article Api] unFavorite Failure',
  (error:string) => ({error})
)

// Toggle Follow
export const FollowSuccess = createAction(
  '[Article Api] Follow Success',
  (profile: ProfileModel) => ({profile})
)

export const FollowFailure = createAction(
  '[Article Api] Follow Failure',
  (error:string) => ({error})
)

export const unFollowSuccess = createAction(
  '[Article Api] unFollow Success',
  (profile: ProfileModel) => ({profile})
)

export const unFollowFailure = createAction(
  '[Article Api] unFollow Failure',
  (error:string) => ({error})
)

// Comments

export const addCommentSuccess = createAction(
  '[Article Api] Add Comments Success',
  (comment: Comment) => ({comment})
)

export const addCommentFailure = createAction(
  '[Article Api] Add Comments Failure',
  (error: string) => ({error})
)

export const deleteCommentsSuccess = createAction(
  '[Article Api] Delete Comments Success',
  (id:number) => ({id})
)

export const deleteCommentsFailure = createAction(
  '[Article Api] Delete Comments Failure',
  (error: string) => ({error})
)