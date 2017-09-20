console.log('Loaded!');
alert("hey! You are looking at Nithika's first webapp");

var element=document.getElementById("text");
element.innerHTML=`Hello! my name is Nithika.<br>I like to paint with pixels and share my thoughts in 140 characters or less.<br>I keep up with technology and laugh at funny stuff.<br>Why dont you read my articles ( links on top right corner of webpage).`;

var img=getElementById("madi");
var marginLeft= 0;
var moveRight = function(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
};

img.onclick=function(){
    var interval=setInterval(moveRight,100);
};
