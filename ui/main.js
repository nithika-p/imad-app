console.log('Loaded!');
alert("hey! You are looking at Nithika's first webapp");

var element=document.getElementById("text");
element.innerHTML=`Hello! my name is Nithika.<br>I like to paint with pixels and share my thoughts in 140 characters or less.<br>I keep up with technology and laugh at funny stuff.<br>Why dont you read my articles ( links on top right corner of webpage).`;

var img=document.getElementById("madi");
var marginLeft= 0;
var moveRight = function(){
    if(marginLeft==600)
    {
      marginLeft=0;
    }
    else
    {
        marginLeft = marginLeft + 2;
        img.style.marginLeft = marginLeft + 'px';
    }
};

img.onclick=function(){
    var interval=setInterval(moveRight,200);
};

var button=document.getElementById('button');
button.onclick=function(){
    var request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter;
            }
        }
    };
    
    request.open('GET','http://nithika1011.imad.hasura-app.io/counter',true);
    request.send(null);
};