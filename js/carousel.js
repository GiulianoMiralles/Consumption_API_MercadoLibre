var body, html, sliderBody, btnLeft, btnRight, i, parts,
    vHeight, vWidth, slide, slideBlock, slides
//Variable definitions
var i = 0,
    parts = 7,

    //Main html elements
    body = document.body,
    html = document.element,


    sliderBody = _id("slider"),
    btnLeft = _id("btn-left"),
    btnRight = _id("btn-right"),

    transitionTime = 1;

    //viewport Height and Width
    vHeight = window.innerHeight,
    vWidth = window.innerWidth,

window.onload = function(){
  prats = parts;
  if(vWidth < 640){
    parts = 1
  } else (parts = prats)
}      
    urls = ["https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-reestrena-tu-auto/698e4e80-8ea6-11e9-b2d7-8976b38ebe61-home-slider_desktop.jpg",
            "https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-6538cac1-f756-44fb-a33c-b14fc3241354.jpg",
            "https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-9fdf2fbe-709f-41e0-ab86-4bbf603fcd1d.jpg",
            "https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-4852265d-4943-4c74-a362-a7f0c1e2ba35.jpg",
            "https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-54fb4377-c0cd-43b3-9038-f80ca0855d44.jpg",
            ];

window.addEventListener("resize", function(){
  vHeight = window.innerHeight;
  vWidth = window.innerWidth;
  
  if(vWidth < 640){
    parts = 1
  }

  slideBlockCreate();
}, false);

window.onload = function(){
  createElements();
}
function createElements(){
  slide = _createEl("div");
  slide.className += "slide-el";

  slideBlockCreate();
}

function slideBlockCreate(){
  slideBlock = _createEl("div");
  slideBlock.className += "slide-block slide-block-";
  slideBlock.style.width = vWidth + "px";
  slideBlock.style.height = (vHeight / parts ) + "px";
  slideBlock.style["transition"] = "left "+ transitionTime +"s";

  slideLayout(); 
}

function slideLayout(){
  sliderBody.innerHTML = "";
  for(var i=0; i < urls.length; i++){
    sliderBody.appendChild(slide.cloneNode(true));
  };
  var slides = _cl("slide-el");
  for(var i=0; i < slides.length; i++){
    for(var x=0; x < parts; x++){
      slides[i].appendChild(slideBlock.cloneNode(true))
      slides[i].className = "slide-el slide-el-"+ i +""
    }
  };
  for(var i = 0; i < slides.length; i++){
    slides[i].style.zIndex = i;
    for(var x=0;x<slides[i].children.length;x++){
      var offset = (x*(100/parts));
      var imageOffset = vHeight / offset;
      var transitionDelay = ((transitionTime / parts)/2)*x;
      slides[i].children[x].style.top = offset + "%";
      slides[i].children[x].innerHTML = "<img src="+ urls[i] +" style='top: "+(((vHeight / parts)*-1)*x)+"px'>"
      // slides[i].children[x].style["background-image"] = "url("+urls[i]+")";
      // slides[i].children[x].style["background-position"] = "50% "+((((vHeight / parts)*-1)*x))/+"px";
      slides[i].children[x].style["transition-delay"] = transitionDelay +"s";
    }
  }
  addStyle();
}

function addStyle(){
  var slides = _cl("slide-el");
  slides[i].className += " opened";
}

btnLeft.addEventListener("click", function(){
  goLeft();
});
function goLeft(){
  var slides = _cl("slide-el");
  if(i > 0){
    i--;
    removeClass(slides[i+1], "opened")
  } else {
    i = urls.length - 1;
    for(x=0;x<urls.length;x++){
      slides[x].className += " opened"
    }
  }
}
btnRight.addEventListener("click", function(){
  goRight();
});

function goRight(){
  var slides = _cl("slide-el");
  if(i < urls.length -1){
    i++;
    slides[i].className += " opened"
  } else {
    i = 0;
    for(x = urls.length; x > 0 ; x--){
      removeClass(slides[x], "opened");
    }
  }
}

//Helper functions
function _id(el){
  return document.getElementById(""+ el +"");
}
function _cl(el){
  return document.getElementsByClassName(""+ el +"")
}
function _createEl(el){
  return document.createElement(""+ el +"");
}
function removeClass(el, _class) {
  if (el && el.className && el.className.indexOf(_class) >= 0) {
    var pattern = new RegExp('\\s*' + _class + '\\s*');
    el.className = el.className.replace(pattern, ' ');
  }
}
