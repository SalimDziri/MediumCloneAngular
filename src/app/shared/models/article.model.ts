import { CommentListResponse } from "./comment.model";
import { Profile } from "./profile.model";
import { TagModel } from "./tag.model";

export interface Article{
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: TagModel['tags'],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: Profile
}

export interface ArticleModel {
    articles: Article[]
}

export interface ArticleDetailsResponse {
    article: Article
}

export interface FavoriteArticle{
    id:number
    slug: string,
    title: string,
    description: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    authorId: number,
    tagList: TagModel['tags'],
    author: Profile,
    favoritedBy: FavoritedByUser[],
    favorited: boolean,
    favoritesCount: number,
}

interface FavoritedByUser{
    id: number,
    email: string,
    username: string,
    password: string,
    image: string,
    bio: string | null,
    demo: boolean
}

export interface FavoriteArticleModel{
    article: FavoriteArticle
}


export interface mergedArticleDataResponse{
    article: ArticleDetailsResponse,
    comments: CommentListResponse
}

export interface newArticleRequest {
    article:{
        title: string,
        description: string,
        body: string,
        tagList: string[]
    }
}