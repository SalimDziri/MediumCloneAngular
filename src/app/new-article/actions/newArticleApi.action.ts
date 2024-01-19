import { createAction } from "@ngrx/store";
import { Article, ArticleDetailsResponse } from "src/app/shared/models/article.model";

export const createArticleSuccess = createAction(
  '[New Article Api] Create Article Success',
  (article:ArticleDetailsResponse) => ({article})
)

export const createArticleFailed = createAction(
  '[New Article Api] Create Article Failure',
  (error:string) => ({error})
)

export const updateArticleSuccess = createAction(
  '[New Article Api] Update Article Success',
  (article:ArticleDetailsResponse) => ({article})
)

export const updateArticleFailed = createAction(
  '[New Article Api] Update Article Failure',
  (error:string) => ({error})
)

export const getOldArticleSuccess = createAction(
  '[New Article Api] Get Old Article Success',
  (article:Article) => ({article})
)

export const getOldArticleFailure = createAction(
  '[New Article Api] Get Old Article Failure',
  (error:string) => ({error})
)