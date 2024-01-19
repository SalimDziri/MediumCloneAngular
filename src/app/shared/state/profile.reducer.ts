import { createReducer, on } from "@ngrx/store";
import { Article } from "../models/article.model";
import { Profile } from "../models/profile.model";
import { ProfileApiActions, ProfilePageActions } from "src/app/home/actions";
import { ArticleApiActions, ArticlePageActions } from "src/app/articles/actions";

// STATE
export interface profileState{
  profile: Profile | null,
  personalArticles: Article[],
  favoritedArticles: Article[],
  loading:{
    loadingProfile: boolean,
    loadingPersonalArticles: boolean,
    loadingFavoritedArticles: boolean,
    loadingFollow: boolean
  }
  errors:{
    profileError: string | null,
    personalArticlesError: string | null,
    favoritedArticlesError: string | null,
    followError: string | null
  }
}

const initState: profileState = {
  profile:  null,
  personalArticles: [],
  favoritedArticles: [],
  loading:{
    loadingProfile: false,
    loadingPersonalArticles: false,
    loadingFavoritedArticles: false,
    loadingFollow: false
  },
  errors:{
    profileError: null,
    personalArticlesError: null,
    favoritedArticlesError: null,
    followError: null
  }
}

// SELECTORS
export const selectProfile = (state: profileState) => state.profile
export const selectPersonalArticles = (state: profileState) => state.personalArticles
export const selectFavoritedArticles = (state: profileState) => state.favoritedArticles
export const selectLoadings = (state: profileState) => state.loading
export const selectErrors = (state: profileState) => state.errors

// REDUCER
export const proileReducer = createReducer(
  initState,
  // getting profile's data
  on(ProfilePageActions.getProfileData, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingProfile: true
      }
    }
  }),
  on(ProfileApiActions.getProfileDataSuccess, (state, action) => {
    return {
      ...state,
      profile: action.profile ,
      loading: {
        ...state.loading,
        loadingProfile: false
      }
    }
  }),
  on(ProfileApiActions.getProfileDataFailure, (state, action) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingProfile: false
      },
      errors: {
        ...state.errors,
        profileError: action.error
      }
    }
  }),
  // getting personal articles list
  on(ProfilePageActions.getPersonalArticles, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingPersonalArticles: true
      }
    }
  }),
  on(ProfileApiActions.getPersonalArticlesSuccess, (state,action) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingPersonalArticles: false
      },
      personalArticles: action.articles
    }
  }),
  on(ProfileApiActions.getPersonalArticlesFailure, (state,action) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingPersonalArticles: false
      },
      errors: {
        ...state.errors,
        personalArticlesError: action.error
      }
    }
  }),
  // getting favorited articles list
  on(ProfilePageActions.getFavoritedArticles, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingFavoritedArticles: true
      }
    }
  }),
  on(ProfileApiActions.getFavoritedArticlesSuccess, (state,action) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingFavoritedArticles: false
      },
      favoritedArticles: action.articles
    }
  }),
  on(ProfileApiActions.getFavoritedArticlesFailure, (state,action) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingFavoritedArticles: false
      },
      errors: {
        ...state.errors,
        favoritedArticlesError: action.error
      }
    }
  }),

  // follow user
  on(ProfilePageActions.Follow, (state) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: true
      },
      errors: {
        ...state.errors,
        followError: null,
      },
    }
  }),
  on(ProfileApiActions.FollowSuccess, (state,action) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: null,
      },
      profile: action.profile.profile
    }
  }),
  on(ProfileApiActions.FollowFailure, (state,action) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: action.error,
      }
    }
  }),

  // unfollow user
  on(ProfilePageActions.UnFollow, (state) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: true
      },
      errors: {
        ...state.errors,
        followError: null,
      },
    }
  }),
  on(ProfileApiActions.unFollowSuccess, (state,action) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: null,
      },
      profile: action.profile.profile
    }
  }),
  on(ProfileApiActions.unFollowFailure, (state,action) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: action.error,
      }
    }
  }),
)