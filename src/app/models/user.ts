import { Post } from 'src/app/models/post';
import { Comment } from './comment';
export class User {

    userId: number;
    username: string;
    password: string;
    email: string;
    comments: Comment[];
    posts: Post[];

    constructor(
        userId: number,
        username: string,
        password: string,
        email: string,
        comments: any[],
        posts: Post[]
    ) {
        this.userId = userId
        this.username = username
        this.password = password
        this.email = email
        this.comments = comments
        this.posts = posts
    }

}