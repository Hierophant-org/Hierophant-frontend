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
        userId: User,
        postId: Post,
        commText: string,
        upvotes: number
    ) {
        this.comId = comId
        this.userId = userId
        this.postId = postId
        this.commText = commText
        this.upvotes = upvotes
    }

}