import { createAction } from "@ngrx/store";
import { Article, FavoriteArticle } from "src/app/shared/models/article.model";
import { TagModel } from "src/app/shared/models/tag.model";

export const getTagsSuucess = createAction(
  '[Home Api] Get Tags Success',
  (tags: TagModel) => ({ tags })
)

export const getTagsFailure = createAction(
  '[Home Api] Get Tags Failure',
  (error: string) => ({ error })
)

export const getSuggestedFeedSuccess = createAction(
  '[Home Api] Get Suggested Feed Success',
  (articles: Article[]) => ({ articles })
)

export const getSuggestedFeedFailure = createAction(
  '[Home Api] Get Suggested Feed Failure',
  (error: string) => ({ error })
)

export const getMyFeedSuccess = createAction(
  '[Home Api] Get My Feed Success',
  (articles: Article[]) => ({ articles })
)

export const getMyFeedFailure = createAction(
  '[Home Api] Get My Feed Failure',
  (error: string) => ({ error })
)

export const favoriteSuccess = createAction(
  '[Home Api] Add to favorite Success',
  (article: FavoriteArticle) => ({article})
)
export const favoriteFailure = createAction(
  '[Home Api] Add to favorite Failure',
  (error: string) => ({error})
)

export const unfavoriteSuccess = createAction(
  '[Home Api] remove from favorite Success',
  (article: FavoriteArticle) => ({article})
)
export const unfavoriteFailure = createAction(
  '[Home Api] remove from favorite Failure',
  (error: string) => ({error})
)