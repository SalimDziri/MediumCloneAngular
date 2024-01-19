import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromHome from "./home.reducer";
import * as fromProfile from "./profile.reducer";
import * as fromArticle from "./article.reducer";
import * as fromNewArticle from "./newArticle.reducer"

export interface GlobalState {
    authState:       fromAuth.authState,
    homeState:       fromHome.homeState,
    profileState:    fromProfile.profileState,
    articleState:    fromArticle.articleState,
    newArticleState: fromNewArticle.newArticleState
}

export const reducers: ActionReducerMap<GlobalState> = {
    authState:       fromAuth.authReducer,
    homeState:       fromHome.homeReducer,
    profileState:    fromProfile.proileReducer,
    articleState:    fromArticle.articleReducer,
    newArticleState: fromNewArticle.newArticleReducer
}

// Auth State Selectors
export const selectAuthState = (state: GlobalState) => state.authState
export const selectAuthUser = createSelector(
    selectAuthState,
    fromAuth.selectUser
)
export const selectAuthError = createSelector(
    selectAuthState,
    fromAuth.selectError
)
export const selectAuthLoading = createSelector(
    selectAuthState,
    fromAuth.selectLoading
)
export const selectAuthUserLoaded = createSelector(
    selectAuthState,
    fromAuth.selectUserLoaded
)

// Home State Selectors
export const selectHomeState = (state: GlobalState) => state.homeState
export const selectHomeTags = createSelector(
    selectHomeState,
    fromHome.selectTags
)
export const selectHomeError = createSelector(
    selectHomeState,
    fromHome.selectError
)
export const selectHomeMyFeed = createSelector(
    selectHomeState,
    fromHome.selectMyFeed
)
export const selectHomeSuggestedFeed = createSelector(
    selectHomeState,
    fromHome.selectSuggustedFeed
)
export const selectHomeLoadingTags = createSelector(
    selectHomeState,
    fromHome.selectLoadingTags
)
export const selectHomeLoadingMyFeed = createSelector(
    selectHomeState,
    fromHome.selectLoadingMyFeed
)
export const selectHomeLoadingFavorite = createSelector(
    selectHomeState,
    fromHome.selectLoadingFavorite
)
export const selectHomeSelectedTag = createSelector(
    selectHomeState,
    fromHome.selectSelectedTag
)
export const selectHomeLoadingSuggested = createSelector(
    selectHomeState,
    fromHome.selectLoadingSuggested
)

// Profile State Selectors
export const selectProfileState = (state: GlobalState) => state.profileState
export const selectProfileProfile = createSelector(
    selectProfileState,
    fromProfile.selectProfile
)
export const selectProfilePersonalArticles = createSelector(
    selectProfileState,
    fromProfile.selectPersonalArticles
)
export const selectProfileFavoritedArticles = createSelector(
    selectProfileState,
    fromProfile.selectFavoritedArticles
)
export const selectProfileErrors = createSelector(
    selectProfileState,
    fromProfile.selectErrors
)
export const selectProfileLoadings = createSelector(
    selectProfileState,
    fromProfile.selectLoadings
)

// Article State Selectors
export const selectArticleState = (state: GlobalState) => state.articleState
export const selectArticleArticle = createSelector(
    selectArticleState,
    fromArticle.selectArticle
)
export const selectArticleLoadingArticle = createSelector(
    selectArticleState,
    fromArticle.selectLoadingArticle
)
export const selectArticleError = createSelector(
    selectArticleState,
    fromArticle.selectError
)
export const selectArticleLoadingFavorite = createSelector(
    selectArticleState,
    fromArticle.selectLoadingFavorite
)
export const selectArticleLoadingFollow = createSelector(
    selectArticleState,
    fromArticle.selectLoadingFollow
)
export const selectArticleComments = createSelector(
    selectArticleState,
    (state) => fromArticle.selectComments()(state)
)
export const selectArticleAddingComments = createSelector(
    selectArticleState,
    fromArticle.selectAddingComment
)
export const selectArticleDeletingComments = createSelector(
    selectArticleState,
    fromArticle.selectDeletingComment
)

// New Article Selectors
export const selectNewArticleState = (state: GlobalState) => state.newArticleState
export const selectNewArticleArticle = createSelector(
    selectNewArticleState,
    fromNewArticle.selectArticle
)
export const selectNewArticleLoading = createSelector(
    selectNewArticleState,
    fromNewArticle.selectLoading
)
export const selectNewArticleError = createSelector(
    selectNewArticleState,
    fromNewArticle.selectError
)