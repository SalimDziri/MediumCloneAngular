import { createAction } from "@ngrx/store";
import { ArticleListQueryParams } from "src/app/api";

export const getTags = createAction(
  '[Home Page] Get Tags'
)

export const getSuggestedFeed = createAction(
  '[Home Page] Get Suggested Feeds',
  (filter?:ArticleListQueryParams) => ({filter})
)

export const getMyFeed = createAction(
  '[Home Page] Get My Feed'
)

export const favorite = createAction(
  '[Home Page] Add To Favorite',
  (slug: string) => ({slug})
)

export const unfavorite = createAction(
  '[Home Page] Remove From Favorite',
  (slug: string) => ({slug})
)

export const addTagFilter = createAction(
  '[Home Page] Add Filter',
  (tag:string) => ({tag})
)

export const removeTagFilter = createAction(
  '[Home Page] Remove Filter'
)