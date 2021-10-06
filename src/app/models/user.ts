export class User {

    userId: number;
    username: string;
    password: string;
    email: string;
    comments: any[];

    constructor(
        userId: number,
        username: string,
        password: string,
        email: string,
        comments: any[]
    ) {
        this.userId = userId
        this.username = username
        this.password = password
        this.email = email
        this.comments = comments
    }

}