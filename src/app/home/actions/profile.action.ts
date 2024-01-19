import { createAction } from "@ngrx/store";

export const getProfileData = createAction(
  '[Profile Page] Get Profile Data',
  (username:string) => ({username})
)

export const getPersonalArticles = createAction(
  '[Profile Page] Get Personal Articles',
  (username:string) => ({username})
)

export const getFavoritedArticles = createAction(
  '[Profile Page] Get Favorited Articles',
  (username:string) => ({username})
)

export const Follow = createAction(
  '[Profile Page] Follow user',
  (username: string) => ({username})
)
export const UnFollow = createAction(
  '[Profile Page] UnFollow user',
  (username: string) => ({username})
)