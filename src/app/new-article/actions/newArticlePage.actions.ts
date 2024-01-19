import { createAction } from "@ngrx/store";
import { newArticleRequest } from "src/app/shared/models/article.model";

export const createNewArticle = createAction(
  '[New Article Page] Create new Article',
  (newArticle:newArticleRequest) => ({newArticle})
)

export const updateArticle = createAction(
  '[New Article Page] Update old Article',
  (updatedArticle:newArticleRequest,slug:string) => ({updatedArticle,slug})
)

export const getOldArticle = createAction(
  '[New Article Page] Get Old Article',
  (slug:string) => ({slug})
)