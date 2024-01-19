import { createReducer, on } from "@ngrx/store";
import { Article } from "../models/article.model";
import { NewArticleApiActions, NewArticlePageActions } from "src/app/new-article/actions";

export interface newArticleState{
  article: Article | null,
  loading: {
    loadingOldArticle: boolean,
    loadingUpdate: boolean,
    loadingNewArticle: boolean
  },
  error: {
    errorOldArticle: string | null,
    errorUpdate: string | null,
    errorNewArticle: string | null
  }
}

const initState: newArticleState = {
  article: null,
  loading: {
    loadingNewArticle: false,
    loadingOldArticle: false,
    loadingUpdate :false
  },
  error: {
    errorNewArticle: null,
    errorOldArticle: null,
    errorUpdate: null
  }
}

export const selectArticle = (state: newArticleState) => state.article
export const selectLoading = (state: newArticleState) => state.loading
export const selectError = (state: newArticleState) => state.error

export const newArticleReducer = createReducer(
  initState,
  on(NewArticlePageActions.getOldArticle, (state) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingOldArticle: true
      },
      error: {
        ...state.error,
        errorOldArticle: null
      }
    }
  }),
  on(NewArticleApiActions.getOldArticleSuccess, (state,action) => {
    return {
      ...state,
      article: action.article,
      loading:{
        ...state.loading,
        loadingOldArticle: false
      },
      error: {
        ...state.error,
        errorOldArticle: null
      }
    }
  }),
  on(NewArticleApiActions.getOldArticleFailure, (state,action) => {
    return {
      ...state,
      loading:{
        ...state.loading,
        loadingOldArticle: false
      },
      error: {
        ...state.error,
        errorOldArticle: action.error
      }
    }
  }),
  on(NewArticlePageActions.createNewArticle, (state) => {
    return {
      ...state,
      error:{
        ...state.error,
        errorNewArticle: null
      },
      loading: {
        ...state.loading,
        loadingNewArticle: true
      }
    }
  }),
  on(NewArticleApiActions.createArticleSuccess, (state)=> {
    return{
      ...state,
      loading: {
        ...state.loading,
        loadingNewArticle: false
      },
      error: {
        ...state.error,
        errorNewArticle: null
      },
    }
  }),
  on(NewArticleApiActions.createArticleFailed, (state,action)=> {
    return{
      ...state,
      loading: {
        ...state.loading,
        loadingNewArticle: false
      },
      error: {
        ...state.error,
        errorNewArticle: action.error
      },
    }
  }),
  on(NewArticlePageActions.updateArticle, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        loadingUpdate: true
      },
      error: {
        ...state.error,
        errorUpdate: null
      },
    }
  }),
  on(NewArticleApiActions.updateArticleSuccess, (state)=> {
    return{
      ...state,
      loading: {
        ...state.loading,
        loadingUpdate: false
      },
      error: {
        ...state.error,
        errorUpdate: null
      },
      article: null
    }
  }),
  on(NewArticleApiActions.updateArticleFailed, (state,action)=> {
    return{
      ...state,
      loading: {
        ...state.loading,
        loadingUpdate: false
      },
      error: {
        ...state.error,
        errorUpdate: action.error
      },
      article: null
    }
  })
)