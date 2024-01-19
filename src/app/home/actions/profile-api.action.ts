import { createAction } from "@ngrx/store";
import { Article } from "src/app/shared/models/article.model";
import { Profile, ProfileModel } from "src/app/shared/models/profile.model";

export const getProfileDataSuccess = createAction(
  '[Profile Api] Get Profile Data Success',
  (profile:Profile) => ({profile})
)
export const getProfileDataFailure = createAction(
  '[Profile Api] Get Profile Data Failure',
  (error:string) => ({error})
)

export const getPersonalArticlesSuccess = createAction(
  '[Profile Api] Get Personal Articles Success',
  (articles:Article[]) => ({articles})
)
export const getPersonalArticlesFailure = createAction(
  '[Profile Api] Get Personal Articles Failure',
  (error:string) => ({error})
)

export const getFavoritedArticlesSuccess = createAction(
  '[Profile Api] Get Favorited Articles Success',
  (articles:Article[]) => ({articles})

)
export const getFavoritedArticlesFailure = createAction(
  '[Profile Api] Get Favorited Articles Failure',
  (error:string) => ({error})
)

// Toggle Follow
export const FollowSuccess = createAction(
  '[Profile Api] Follow Success',
  (profile: ProfileModel) => ({profile})
)

export const FollowFailure = createAction(
  '[Profile Api] Follow Failure',
  (error:string) => ({error})
)

export const unFollowSuccess = createAction(
  '[Profile Api] unFollow Success',
  (profile: ProfileModel) => ({profile})
)

export const unFollowFailure = createAction(
  '[Profile Api] unFollow Failure',
  (error:string) => ({error})
)