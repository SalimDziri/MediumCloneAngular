import { createReducer, on } from "@ngrx/store";
import { Article } from "../models/article.model";
import { ArticleApiActions, ArticlePageActions } from "src/app/articles/actions";
import { Comment } from "../models/comment.model";
import { EntityState, createEntityAdapter } from '@ngrx/entity'

// STATE
export interface articleState extends EntityState<Comment>{
  article: Article | null,
  loadingArticle: boolean,
  settings:{
    loadingFavorite: boolean,
    loadingFollow: boolean,
    addingComment: Boolean,
    deletingComment: Boolean
  },
  errors:{
    articleError: null | string,
    favoriteError: null | string,
    followError: null | string,
    addCommentError: null | string,
    deleteCommentError: null | string
  }
}

const adapter = createEntityAdapter<Comment>({
  selectId:(comment) => comment.id
})

const initState: articleState = {
  ...adapter.getInitialState(),
  article: null,
  loadingArticle: false,
  settings: {
    loadingFavorite: false,
    loadingFollow: false,
    addingComment: false,
    deletingComment: false,
  },
  errors: {
    articleError: null,
    favoriteError: null,
    followError: null,
    addCommentError: null,
    deleteCommentError: null,
  },
};

// SELECTORS
export const selectArticle = (state: articleState) => state.article
export const selectLoadingArticle = (state: articleState) => state.loadingArticle
export const selectLoadingFavorite = (state: articleState) => state.settings.loadingFavorite
export const selectLoadingFollow = (state: articleState) => state.settings.loadingFollow
export const selectAddingComment = (state: articleState) => state.settings.addingComment
export const selectDeletingComment = (state: articleState) => state.settings.deletingComment
export const selectError = (state: articleState) => state.errors
export const selectComments = () => adapter.getSelectors().selectAll

// REDUCER
export const articleReducer = createReducer(
  initState,
  // loading article details
  on(ArticlePageActions.loadArticleDetails, (state)=> {
    return {
      ...state,
      loadingArticle: true,
      errors: {
        ...state.errors,
        articleError: null
      } 
    }
  }),
  on(ArticleApiActions.loadArticleDetailsSuccess, (state,action) => {
    return adapter.setAll(action.article.comments.comments, {
      ...state,
      loadingArticle: false,
      article: action.article.article.article,
      errors: {
        ...state.errors,
        articleError: null
      }
    })
  }),
  on(ArticleApiActions.loadArticleDetailsFailure, (state,action) => {
    return {
      ...state,
      loadingArticle: false,
      errors: {
        ...state.errors,
        articleError: action.error
      }
    }
  }),
  

  // following the author
  on(ArticlePageActions.Follow, (state) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: true
      }
    }
  }),
  on(ArticleApiActions.FollowSuccess, (state,action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: false
      },
      errors:{
        ...state.errors,
        followError: null
      },
      article:{
        ...state.article!,
        author: action.profile.profile
      }
    }
  }),
  on(ArticleApiActions.FollowFailure, (state, action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: action.error
      }
    }
  }),

  // unfollowing the author
  on(ArticlePageActions.UnFollow, (state) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: true
      }
    }
  }),
  on(ArticleApiActions.unFollowSuccess, (state,action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: false
      },
      errors:{
        ...state.errors,
        followError: null
      },
      article:{
        ...state.article!,
        author: action.profile.profile
      }
    }
  }),
  on(ArticleApiActions.unFollowFailure, (state, action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFollow: false
      },
      errors: {
        ...state.errors,
        followError: action.error
      }
    }
  }),

  // favoriting the article
  on(ArticlePageActions.favorite, (state) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFavorite: true
      }
    }
  }),
  on(ArticleApiActions.favoriteSuccess, (state, action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFavorite: false
      },
      errors:{
        ...state.errors,
        favoriteError: null
      },
      article: action.article.article
    }
  }),
  on(ArticleApiActions.favoriteFailure, (state, action) => {
    return {
      ...state,
      loadingFavorite: null,
      errors: {
        ...state.errors,
        favoriteError: action.error
      }
    }
  }),

  // unfavoriting the article
  on(ArticlePageActions.unfavorite, (state) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFavorite: true
      }
    }
  }),
  on(ArticleApiActions.unfavoriteSuccess, (state, action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        loadingFavorite: false
      },
      errors:{
        ...state.errors,
        favoriteError: null
      },
      article: action.article.article
    }
  }),
  on(ArticleApiActions.unfavoriteFailure, (state, action) => {
    return {
      ...state,
      loadingFavorite: null,
      errors: {
        ...state.errors,
        favoriteError: action.error
      }
    }
  }),

  // delete comment
  on(ArticlePageActions.deleteComments, (state) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        deletingComment: true
      },
      errors:{
        ...state.errors,
        deleteCommentError: null
      }
    }
  }),
  on(ArticleApiActions.deleteCommentsSuccess, (state,action) => {
    return adapter.removeOne(action.id, {
      ...state,
      settings:{
        ...state.settings,
        deletingComment: false
      },
      errors:{
        ...state.errors,
        deleteCommentError: null
      }
    })
  }),
  on(ArticleApiActions.deleteCommentsFailure, (state,action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        deletingComment: false
      },
      errors:{
        ...state.errors,
        deleteCommentError: action.error
      }
    }
  }),

  // add a comment
  on(ArticlePageActions.addComment, (state) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        addingComment: true
      },
      errors:{
        ...state.errors,
        addCommentError: null
      }
    }
  }),
  on(ArticleApiActions.addCommentSuccess, (state,action) => {
    return adapter.addOne(action.comment, {
      ...state,
      settings:{
        ...state.settings,
        addingComment:false
      },
      errors:{
        ...state.errors,
        addCommentError: null
      }
    })
  }),
  on(ArticleApiActions.addCommentFailure, (state,action) => {
    return {
      ...state,
      settings:{
        ...state.settings,
        addingComment: false
      },
      errors:{
        ...state.errors,
        addCommentError: action.error
      }
    }
  })

)