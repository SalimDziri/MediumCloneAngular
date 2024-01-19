import { Profile } from "./profile.model";

export interface Comment{
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: Profile
}

export interface CommentListResponse {
    comments: Comment[]
}

export interface CommentCreatedResponse {
    comment: Comment
}

export interface CommentRequest {
    comment: {
        body: string
    }
}