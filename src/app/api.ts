export const  baseUrl = "https://api.realworld.io"

/**
 * Login endpoint (No authentication required)
 * 
 * Type: POST
 * 
 * Required: user{ email, password }
 * 
 * Response: UserModel
 * 
 * @example
 * 
 * return this.http.post<UserModel>(loginEndpoint, {user:{email:"email",password:"password"}} )
 */
export const loginEndpoint = `${baseUrl}/api/users/login`


/**
   * resitration endpoint  (No authentification required)
   * 
   * type: POST
   * 
   * required: user{ email, username, password }
   * 
   * response: UserModel
   * 
   * @example
   * 
   * return this.http.post<UserModel>(registerEndpoint, {user:{email:"email" ,username:"username",password:"password"}} ) 
*/
export const registerEndpoint = `${baseUrl}/api/users`


/** 
   * get current user endpoint  (Authentification required)
   * 
   * type: GET
   * 
   * response: UserModel
*/
export const getUserEndpoint = `${baseUrl}/api/user`


/**
   * update user enfpoint  (Authentification required)
   * 
   * type: PUT
   * 
   * accepted fields: email, username, password, image, bio
   * 
   * response: UserModel
*/
export const updateUserEndpoint = `${baseUrl}/api/user`


/**
   * get profile endpoint (Authentification Optional)
   * 
   * type: GET
   * 
   * required: username in the url itself
   * 
   * response: ProfileModel
*/
export const getProfileEndpoint = (username: string) => `${baseUrl}/api/profiles/${username}`


/**
   * follow user endpoint  (Authentification required)
   *
   * type: POST
   *
   * response: ProfileModel
*/
export const followUserEndpoint = (username: string) => `${baseUrl}/api/profiles/${username}/follow`


/**
   * unfollow user endpoint  (Authentification required)
   * 
   * type: DELETE
   * 
   * response: ProfileModel
 */
export const unfollowUserEndpoint = (username: string) => `${baseUrl}/api/profiles/${username}/follow`


/**
   * list articles endpoint  (Authentification optional)
   * 
   * type: GET
   * 
   * optional queries: ?tag, ?author, ?favorited, ?limit, ?offset
   * 
   * response: ArticlesModel[] ordered by most recent + filter by query if exists
*/
export const articlesListEndpoint = (query?: ArticleListQueryParams) => {
    let endpoint = `${baseUrl}/api/articles`
    if (query) {
        const allowedParams: Array<keyof ArticleListQueryParams> = [
          'tag',
          'author',
          'favorited',
          'limit',
          'offset',
        ];
    
        const validQueryParams = Object.entries(query)
          .filter(([key, _]) => allowedParams.includes(key as keyof ArticleListQueryParams))
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
    
        if (validQueryParams) {
          endpoint += `?${validQueryParams}`;
        }
    }
    return endpoint
}
export interface ArticleListQueryParams {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
}


/**
    * feed article endpoint  (Authentification required)
    *
    * type: GET
    *
    * optional query? ?limit, ?offset
    * 
    * response: ArticleModel[] ordered by most recent + filter by query if exists
*/
export const articlesFeedEndpoint = (query?: ArticleFeedtQueryParams) => {
    let endpoint = `${baseUrl}/api/articles/feed`
    if (query) {
        const allowedParams: Array<keyof ArticleFeedtQueryParams> = [
          'limit',
          'offset',
        ];
    
        const validQueryParams = Object.entries(query)
          .filter(([key, _]) => allowedParams.includes(key as keyof ArticleFeedtQueryParams))
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
    
        if (validQueryParams) {
          endpoint += `?${validQueryParams}`;
        }
    }
    return endpoint
}
interface ArticleFeedtQueryParams {
    limit?: number;
    offset?: number;
}


/**
   * get article endpoint  (Authentification not required)
   * 
   * type: GET
   * 
   * required parameter: slug in the url itself
   * 
   * response: ArticleModel
*/
export const getArticleEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}`


/**
   * create article endpoint  (Authentification required)
   * 
   * type: POST
   * 
   * required fields: title, description, body
   * 
   * optional fields: taglist => ["tag1","tag2"]
   * 
   * response: ArticleModel
*/
export const createArticleEndpoint = `${baseUrl}/api/articles`


/**
   * update article endpoint  (Authentification required)
   * 
   * type: PUT
   * 
   * optional fields: title, description, body
   * 
   * response: ArticleModel
*/
export const updateArticleEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}`


/**
   * delete article endpoint  (Authentification required)
   * 
   * type: DELETE
*/
export const deleteArticleEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}`


/**
   * add comment endpoint  (Authentification required)
   * 
   * type: POST
   * 
   * required field: body
   * 
   * response: CommentModel
*/
export const addCommentEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}/comments`


/**
   * get article comment endpoint  (Authentification optional)
   * 
   * type: GET
   * 
   * response: CommentModel[]
*/
export const getCommentsEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}/comments`


/**
   * delete comment endpoint  (Authentification required)
   * 
   * type: DELETE
*/
export const deleteCommentEndpoint = (slug: string, id: number) => `${baseUrl}/api/articles/${slug}/comments/${id}`


/**
   * favorite an article endpoint  (Authentification required)
   * 
   * type: POST
   * 
   * response: ArticleModel
*/
export const favouriteArticleEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}/favorite`


/**
   * unfavorite an article  (Authentification required)
   * 
   * type: DELETE
   * 
   * response: ArticleModel
*/
export const unfavouriteArticleEndpoint = (slug: string) => `${baseUrl}/api/articles/${slug}/favorite`


/**
   * get tags endpoint  (Authentification not required)
   * 
   * type: GET
   * 
   * response: TagModel[]
*/
export const getTagsEndpoint = `${baseUrl}/api/tags`