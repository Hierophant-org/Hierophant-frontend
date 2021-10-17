export class Image {
    imageId: number;
    name:string;
    pic:string;
    type:string;
    imgHtml:string;

    constructor(
        
        imageId: number,
        name: string,
        pic: string,
        type:string,
        imgHtml:string
    ) {
        
        this.imageId = imageId
        this.name = name
        this.pic = pic
        this.type = type
        this.imgHtml = imgHtml
    }
}