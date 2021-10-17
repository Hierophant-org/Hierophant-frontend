import { User } from './user'
import { Post } from './post';
export class Comment {
    comId: number;
    userId: User;
    postId: Post;
    commText: string;
    upvotes: number;

    constructor(
        comId: number,
        user: User,
        post: Post,
        commText: string,
        upvotes: number
    ) {
        this.comId = comId
        this.userId = user
        this.postId = post
        this.commText = commText
        this.upvotes = upvotes
    }
}