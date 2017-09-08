var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var content ={
    title:'article-1',
    heading:'introduction',
    content:`<p>
                Hello!,I'm Nithika . I reside in Bangalore. I'm doing  B.Tech Computer Science Engineering. I love to learn new technology.
            </p>
            <br>
            <p>
                Hello!,I'm Nithika . I reside in Bangalore. I'm doing  B.Tech Computer Science Engineering. I love to learn new technology.
            </p>
            <br>
            <p>
                Hello!,I'm Nithika . I reside in Bangalore. I'm doing  B.Tech Computer Science Engineering. I love to learn new technology.
            </p>`
};

function createTemplate(data){
   var title=data.title;
   var heading=data.heading;
   var content=data.content;

     var htmlTemplate=
         `<html>
        <head>
            ${title}
            <link rel="stylesheet" href="/ui/style.css"/>
        </head>
        <body>
            <a class="link" href="/">home</a>
            <a class="link" href="/ui/article-two">article 2</a>
            <a class="link" href="/ui/article-three">article 3</a>
            <div class="heading">
                ${heading}
            </div>
            <hr/>
            <div class="container">
                ${content}
            </div>
        </body>
    </html>`;

     
 }



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/article-one',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-one.html'));
});

app.get('/ui/article-two',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/ui/article-three',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
