import { createAction } from "@ngrx/store";
import { CommentRequest } from "src/app/shared/models/comment.model";

export const loadArticleDetails = createAction(
  '[Article Page] Load Article Details',
  (slug: string) => ({slug})
)

export const favorite = createAction(
  '[Article Page] Favorite article',
  (slug: string) => ({slug})
)
export const unfavorite = createAction(
  '[Article Page] UnFavorite article',
  (slug: string) => ({slug})
)

export const Follow = createAction(
  '[Article Page] Follow user',
  (username: string) => ({username})
)
export const UnFollow = createAction(
  '[Article Page] UnFollow user',
  (username: string) => ({username})
)

export const addComment = createAction(
  '[Article Page] Add Comments',
  (slug: string,commentRequest:CommentRequest) => ({slug,commentRequest})
)

export const deleteComments = createAction(
  '[Article Page] Delete Comments',
  (slug:string, id: number) => ({slug,id})
)