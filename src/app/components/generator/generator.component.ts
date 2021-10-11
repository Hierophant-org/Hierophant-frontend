import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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
topTextColor = '00000';
bottomTextColor = '00000';
topTextSize =  '40px'; 
bottomTextSize = '40px';
topTextFont = 'Times New Roman';
bottomTextFont = "Times New Roman";
ImageWidth = 0;
ImageHeight = 0;
image = new Image();

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
  this.http.get<any>("https://api.imgflip.com/get_memes").subscribe
  (
   response =>
   {
    
     this.memes = response.data.memes;
     
   }
  );
}

saveImage(e:any)
{
  console.log("savingImage...");
  
}


}



