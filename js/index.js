window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

var image = null;
var ImageGray = null;
var ImageSkyblue = null;
var ImageRed = null;
var ImageRainbow = null;
var OriginalImage = null;


function UploadImage() {
  //alert("Your file loaded!");
  var fin = document.getElementById("user");
  //var filename = fin.value;
  //skyblue = new SimpleImage(fin);
  OriginalImage = new SimpleImage(fin);
  image = new SimpleImage(fin);
  ImageGray = new SimpleImage(fin);
  ImageSkyblue = new SimpleImage(fin);
  ImageRed = new SimpleImage(fin);
  ImageRainbow = new SimpleImage(fin);
  var canvas = document.getElementById("can");
  image.drawTo(canvas);
}

function everythingOkWithImage(img) {
  if (img == null || !img.complete()) {
    return false;
  } else {
    return true;
  }
}

function doGray() {
  if (everythingOkWithImage(ImageGray)) {
    Grayscale();
  }
  else {
    alert("Grayscale filter not found");
  }
}

function Grayscale() {
//alert("hi");  
  {
    for (var pixel of ImageGray.values()) {
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var canvas = document.getElementById("can");
    ImageGray.drawTo(canvas);
}
}

function doSkyblue() {
  if (everythingOkWithImage(ImageSkyblue)) {
    var skyblue = changePixelSkyblue();
    
    var canvas = document.getElementById("can");
  skyblue.drawTo(canvas);
  }
  else {
    alert("Skyblue filter not found");
  }
}

function changePixelSkyblue() {
  //alert("yao");
  var skyblue = new SimpleImage(ImageSkyblue);
  for (var pixel of skyblue.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) /3;
    if (avg < 196) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(1.3*avg);
    }
    else {
      pixel.setRed(avg-61);
      pixel.setGreen(1.05*avg);
      pixel.setBlue(1.2*avg);
    }
  }
  return skyblue ;
}

function doRed() {
  if (everythingOkWithImage(ImageRed)){
    var red = changePixelRed();
    var canvas = document.getElementById("can");
    red.drawTo(canvas);
}
   else{
     alert("Red Image not found");
   }
}

function changePixelRed() {
  //alert("em");
  var red = new SimpleImage(ImageRed);
  for (var pixel of red.values()){
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
    if (avg <= 128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else {
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
  }
  return red;
}

function doRainbow() {
  if (everythingOkWithImage(ImageRainbow)){
     var canvas = document.getElementById("can");
    var rainbow = changePixelRainbow();
    rainbow.drawTo(canvas);
}
   else{
     alert("Rainbow Image not found");
   }
}

function changePixelRainbow(canvas) {
  var rainbow = new SimpleImage(ImageRainbow);
  for (var pixel of rainbow.values()) {
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
     if(pixel.getY() < rainbow.getHeight()/7) {
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
     if (pixel.getY() >1*rainbow.getHeight()/7) {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
    }
     if (pixel.getY() >2*rainbow.getHeight()/7) {
         pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
    }
    if (pixel.getY() >3*rainbow.getHeight()/7) {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
    }
    if (pixel.getY() >4*rainbow.getHeight()/7) {
         pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
    }
    if (pixel.getY() >5*rainbow.getHeight()/7) {
         pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
    }
    if (pixel.getY() >6*rainbow.getHeight()/7) {
         pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
    }
} 
  return rainbow;
}


function resetImage() {
  //alert("a lot");
  if (everythingOkWithImage(image)) {
  var canvas3 = document.getElementById("can");
    //var canvas = document.getElementById("can");
    clearCan(canvas3);
    OriginalImage.drawTo(canvas3);
    //image = new SimpleImage(image);
    //ImageGray = new SimpleImage(image);
    //imagegray.drawTo(canvas3);
    //ImageSkyblue = new SimpleImage(image);
    //ImageRed = new SimpleImage(image);
  } //else {
    //alert("Image not found");
}
//}

function clearCan(canvas) {
  //var canvass = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, canvas.width, canvas.height);
}