var img=document.getElementById('madi');
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

var button=document.getElementById('counter');
button.onclick=function(){
    var request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    
    request.open('GET','http://nithika1011.imad.hasura-app.io/counter',true);
    request.send(null);
};