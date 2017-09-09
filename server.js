var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');

var app = express();
app.use(morgan('combined'));

var articles={

    'article-one' : {
        title:'article-1',
        heading:'Introduction',
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
    },
    'article-two' : {
        title:'article-2',
        heading:'Personal',
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
        
    },
    'article-three' : {
        title:'article-3',
        heading:'Academics',
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
        
    }
};

function createTemplate(data){
   var title=data.title;
   var heading=data.heading;
   var content=data.content;

     var htmlTemplate=
         `<html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="/ui/style.css"/>
        </head>
        <body>
            <nav id="navigation">
                <ul>
                    <li><a class="link" href="/">home</a></li>
                    <li><a class="link" href="/ui/article-two">Personal</a></li>
                    <li><a class="link" href="/ui/article-three">Academics</a></li>
                </ul>
                <div class="heading">
                    <h1>${heading}</h1>
                </div>
            </nav>
            <div class="container">
                ${content}
            </div>
        </body>
    </html>`;
    
    return htmlTemplate;
     
 }
 
 function hash(input,salt){
     var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
     return hashed.toString('hex');
 }
 

app.get('/hash/:input',function (req,res) {
    var hashedString = hash(req.params.input,'this-is-some-random-salt-string');
    res.send(hashedString);
});


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
