import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { backendUrl } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
export class MEME
{
  constructor(public title : String,public url : String)
  {

  }
}



@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  @ViewChild('memeCanvas', {static: false}) ImageCanvas:any;

memes : MEME[] =[];  
topText = '';
bottomText = '';
topTextColor = 'black';
bottomTextColor = 'black';
topTextSize =  '40px'; 
bottomTextSize = '40px';
topTextFont = 'Times New Roman';
bottomTextFont = "Times New Roman";
ttx = 0;
tty=0;
btx=0;
bty=0;
ImageWidth = 0;
ImageHeight = 0;
image = new Image();
file:any;



fileEvent:any;

  constructor(private http:HttpClient) { }




  
  ngOnInit(): void {
    this.getMemes();
  } 


drawImage(e:any )
{
console.log(e);
 
 let canvas = this.ImageCanvas.nativeElement;
 let ctx = canvas.getContext('2d');
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 let render = new FileReader();
 let img = new Image();


console.log(e.type);
 if(e.type == "change")
 {

  

  this.fileEvent = e;
  this.file = e.target.files[0];
   console.log(e.target.files[0]);
    render.readAsDataURL(e.target.files[0]);
    render.onload = function ()
    { 
      img.src = render.result as string;
      
          img.onload = function () 
          {
            if(e.target)
             {
            
            console.log(img.height , img.width);
            ctx.drawImage(img , 0 , 0 , img.width, img.height);
             }
          } 
          
    }
      console.log(this.ImageHeight , this.ImageWidth);
      this.resizeImage(img);    
 }
 else if(e.type == "click")
 {
  if(e.target)
  {
    this.file = e.target.url;
  img.src = e.target.src as string;
  console.log(img.height , img.width);
      img = this.resizeImage(img);
      
      console.log(this.ImageHeight , this.ImageWidth);
      this.fileEvent = e;
       img.onload = function () 
       {
         ctx.drawImage(img , 0 , 0 , img.width , img.height);
       } 
  }
}
else
  {
    this.drawImage(this.fileEvent);
  } 
}

resizeImage(img:any)
{
  while(img.width > screen.width * 0.45|| img.height > screen.height * 0.75)
  {   
   
     img.width -= 1;
     img.height -= 1 ;
     
  }
  while(img.width < screen.width * 0.45 && img.height < screen.height * 0.75)
  {   
   
     img.width += 1;
     img.height += 1 ;
     
  }
  this.ImageWidth = img.width;
  this.ImageHeight = img.height;
  return img;
}


changeColorOfTopText(e:any)
{

this.topTextColor = e.target.value;

console.log("Changing top text color to ,  \n"+e.target.value);
}
changeColorOfBottomText(e:any)
{

this.bottomTextColor = e.target.value;

console.log("Changing bottom text color to ,  \n"+e.target.value);
}

changeSizeOfTopText(e:any)
{

this.topTextSize = e.target.value+"px";
console.log("Changing top text size to ,  \n"+this.topTextSize);
}

changeSizeOfBottomText(e:any)
{
  
  this.bottomTextSize = e.target.value+"px";
  console.log("Changing bottom text size to ,  \n"+this.bottomTextSize);
}

changeFontOfTopText(e:any)
{
  
  this.topTextFont = e.target.value;
  console.log("Changing top text font to ,  \n"+this.topTextFont);
}

changeFontOfBottomText(e:any)
{
  
  this.bottomTextFont = e.target.value;
  console.log("Changing bottom text font to ,  \n"+this.bottomTextFont);
}


getMemes()
{
  ////*"https://api.imgflip.com/get_memes"*/
  this.http.get<any>(  "http://alpha-meme-maker.herokuapp.com/1"   ).subscribe
  (
   response =>
   {

     this.memes = response.data.memes;
     console.log(this.memes.toString());
   }
  );
}

addTextToCanvas()
{

  let canvas = this.ImageCanvas.nativeElement as HTMLCanvasElement;
  let cc = canvas.getBoundingClientRect();
  let rect1 = document.getElementById("overlay1");
  let bc1 = rect1!.getBoundingClientRect();
  let rect2 = document.getElementById("overlay2");
  let bc2 = rect2!.getBoundingClientRect();
  this.ttx = bc1.x  - cc.x;
  this.tty = bc1.y  - cc.y + rect1!.getBoundingClientRect().height / 2;
  this.btx = bc2.x  - cc.x;
  this.bty = bc2.y  - cc.y + rect2!.getBoundingClientRect().height / 2;
  
  //let canvas = document.getElementById("memeCanvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d");
  ctx!.font = this.topTextSize+" "+this.topTextFont;
  ctx!.fillStyle = this.topTextColor;
  ctx!.fillText(this.topText, this.ttx, this.tty);
  ctx!.font = this.bottomTextSize+" "+this.bottomTextFont;
  ctx!.fillStyle = this.bottomTextColor;
  ctx!.fillText(this.bottomText, this.btx, this.bty);

}

updateImage()
{





  
  
      // let file: File = this.file;
      // let formData:FormData = new FormData();
      // formData.append('myImage', file, file.name);
      // let headers = new Headers();
      // /** In Angular 5, including the header Content-Type can invalidate your request */
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`http://localhost:5000/images/UpImg`, formData, options)
      //     .map(res => res.json())
      //     .catch(error => Observable.throw(error))
      //     .subscribe(
      //         data => console.log('success'),
      //         error => console.log(error)
      //     )
  

  
  // let canvas = this.ImageCanvas.nativeElement ;
  // //let canvas = document.getElementById("memeCanvas") as HTMLCanvasElement;
  // this.addTextToCanvas();
  // //var canvasData = canvas.toDataURL("image/png");

  // var fd = new FormData();
  // let headers = new Headers();
  // headers.append('Content-Type', 'multipart/form-data');
  // headers.append('Accept', 'application/json');

  //    let options = new RequestOptions({ headers: headers });
  //    var blob = new Blob(canvas.toDataURL('images/jpg'), {type : 'application/json'});
  //     let beelob = new File([blob], this.file.name);
  //     console.log(beelob);
  //   fd.append("myImage", beelob , this.file.name);
     
  //      console.log(fd)
  //      this.http.post('localhost:5000/hierophant/images/uploadImage' , fd)
  //           .map(res => res.json())
  //           .catch(error => Observable.throw(error))
  //           .subscribe(
  //               data => console.log('success'),
  //               error => console.log(error)
  //      )
    
  
  
}

uploadFile(){
 let canvas = this.ImageCanvas.nativeElement ;
   //canvas = document.getElementById("memeCanvas") as HTMLCanvasElement;
  this.addTextToCanvas();
  var canvasData = canvas.toDataURL("image/png");
  var fd = new FormData();
  
      let beelob = new File([ canvas.toDataURL("image/png")], this.file.name);
       console.log(beelob);
    fd.append("myImage", beelob );

  ////******** */
console.log("uploading Image...");
  let formData = new FormData();
  formData.append('myImage', this.file);

  let params = new HttpParams();

  const options = {
    params: params,
    reportProgress: false,
  };

  
  this.http.post('http://localhost:5000/hierophant/images/upLoad', fd, options).subscribe(
    response=>
    {
      console.log(response.toString());
    }
  )
  
}


}
