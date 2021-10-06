export class Image {

    imageId: number;
    imgHtml: string;
    topText: string;
    bottomText: string;

    constructor(
        imageId: number,
        imgHtml: string,
        topText: string,
        bottomText: string
    ) {
        this.imageId = imageId
        this.imgHtml = imgHtml
        this.topText = topText
        this.bottomText = bottomText
    }

}