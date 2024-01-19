import { createReducer, on } from "@ngrx/store";
import { Article } from "../models/article.model";
import { TagModel } from "../models/tag.model";
import { HomeApiActions, HomePageActions } from "src/app/home/actions";


// STATE
export interface homeState{
  tags: TagModel['tags'] | null,
  suggustedFeed: Article[] 
  myFeed: Article[] | null
  loadingTags: boolean,
  loadingMyFeed: boolean,
  loadingSuggested: boolean,
  loadingFavorite: string | null,
  selectedTag: string | null,
  error: string | null
}

const initState: homeState = {
  tags: null,
  suggustedFeed: [],
  myFeed: null,
  loadingTags: false,
  loadingMyFeed: false,
  loadingSuggested: false,
  loadingFavorite: null,
  selectedTag: null,
  error: null
}


// SELECTORS
export const selectTags = (state: homeState) => state.tags
export const selectError = (state: homeState) => state.error
export const selectSuggustedFeed = (state: homeState) => state.suggustedFeed
export const selectMyFeed = (state: homeState) => state.myFeed
export const selectLoadingTags = (state: homeState) => state.loadingTags
export const selectLoadingSuggested = (state: homeState) => state.loadingSuggested
export const selectLoadingFavorite = (state: homeState) => state.loadingFavorite
export const selectSelectedTag = (state: homeState) => state.selectedTag
export const selectLoadingMyFeed = (state: homeState) => state.loadingMyFeed


// REDUCER
export const homeReducer = createReducer(
  initState,
  // getting tags
  on(HomePageActions.getTags, (state) => {
    return {
      ...state,
      loadingTags: true
    }
  }),
  on(HomeApiActions.getTagsSuucess, (state, action) => {
    return {
      ...state,
      loadingTags: false,
      tags: action.tags.tags
    }
  }),
  on(HomeApiActions.getTagsFailure, (state, action) => {
    return {
      ...state,
      loadingTags: false,
      error: action.error
    }
  }),
  // getting suggested feed
  on(HomePageActions.getSuggestedFeed, (state) => {
    return {
      ...state,
      loadingSuggested: true
    }
  }),
  on(HomeApiActions.getSuggestedFeedSuccess, (state, action) => {
    return {
      ...state,
      loadingSuggested: false,
      suggustedFeed: action.articles
    }
  }),
  on(HomeApiActions.getSuggestedFeedFailure, (state, action) => {
    return {
      ...state,
      loadingSuggested: false,
      error: action.error,
      selectedTag: null
    }
  }),
  // get my feed
  on(HomePageActions.getMyFeed, (state) => {
    return {
      ...state,
      loadingMyFeed: true
    }
  }),
  on(HomeApiActions.getMyFeedSuccess, (state, action) => {
    return {
      ...state,
      loadingMyFeed:false,
      myFeed: action.articles
    }
  }),
  on(HomeApiActions.getMyFeedFailure, (state,action) => {
    return {
      ...state,
      loadingMyFeed:false,
      error:action.error
    }
  }),
  // favorite/unfavorite an article
  on(HomePageActions.favorite, (state, action) => {
    return {
      ...state,
      loadingFavorite: action.slug
    }
  }),
  on(HomePageActions.unfavorite, (state, action) => {
    return {
      ...state,
      loadingFavorite: action.slug
    }
  }),
  on(HomeApiActions.favoriteSuccess, (state, action) => {
    const updatedArticles = state.suggustedFeed?.map(
      oldArticle => {
         if(action.article.slug === oldArticle.slug){
          return {
            ...oldArticle,
            favorited: action.article.favorited,
            favoritesCount: action.article.favoritesCount
          }
         }
         return oldArticle
      }
    )
    return {
      ...state,
      suggustedFeed: updatedArticles,
      loadingFavorite: null
    }
  }),
  on(HomeApiActions.favoriteFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingFavorite: null
    }
  }),
  on(HomeApiActions.unfavoriteSuccess, (state, action) => {
    const updatedArticles = state.suggustedFeed?.map(
      oldArticle => {
        if(action.article.slug === oldArticle.slug){
         return {
           ...oldArticle,
           favorited: action.article.favorited,
           favoritesCount: action.article.favoritesCount
         }
        }
        return oldArticle
     }
    )
    return {
      ...state,
      suggustedFeed: updatedArticles,
      loadingFavorite: null
    }
  }),
  on(HomeApiActions.unfavoriteFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingFavorite: null
    }
  }),
  // Add / Remove Tag filtering
  on(HomePageActions.addTagFilter, (state, action) => {
    return {
      ...state,
      selectedTag: action.tag
    }
  }),
  on(HomePageActions.removeTagFilter, (state) => {
    return {
      ...state,
      selectedTag: null
    }
  })
)