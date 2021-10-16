import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { backendUrl } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Meme}from 'src/app/models/meme';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  @ViewChild('memeCanvas', {static: false}) ImageCanvas:any;

  memes:any;  
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

  constructor(private http:HttpClient , private GService:GeneratorService) { }

  ngOnInit(): void {
    this.memes = this.GService.getMemes();
  } 

drawImage(e:any )
{
console.log(e);
 
 let canvas = this.ImageCanvas.nativeElement;
 let ctx = canvas.getContext('2d');
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 let render = new FileReader();
 let img = new Image();
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
  while(img.width > parent.innerWidth * 0.45|| img.height > parent.innerHeight * 0.75)
  {   
   
     img.width -= 1;
     img.height -= 1 ;
     
  }
  while(img.width < parent.innerWidth  * 0.45 && img.height < parent.innerHeight  * 0.75)
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
}
changeColorOfBottomText(e:any)
{
this.bottomTextColor = e.target.value;
}

changeSizeOfTopText(e:any)
{
this.topTextSize = e.target.value+"px";
}

changeSizeOfBottomText(e:any)
{
  this.bottomTextSize = e.target.value+"px";
}

changeFontOfTopText(e:any)
{
  this.topTextFont = e.target.value;
}

changeFontOfBottomText(e:any)
{
  this.bottomTextFont = e.target.value;
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
  var ctx = canvas.getContext("2d");
  ctx!.font = this.topTextSize+" "+this.topTextFont;
  ctx!.fillStyle = this.topTextColor;
  ctx!.fillText(this.topText, this.ttx, this.tty);
  ctx!.font = this.bottomTextSize+" "+this.bottomTextFont;
  ctx!.fillStyle = this.bottomTextColor;
  ctx!.fillText(this.bottomText, this.btx, this.bty);

}

uploadFile(){

  let canvas = this.ImageCanvas.nativeElement ;
  this.addTextToCanvas();
      let beelob = new File([ canvas.toDataURL("image/png")], this.file.name);
       console.log(beelob);
       this.GService.uploadImageFile(beelob)
}


}
