var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
// create a pool-cached database connection
var Pool=require('pg').Pool;

var config={
    user:'nithika1011',
    database:'nithika1011',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={

    'article-one' : {
        title:'article-1',
        nav1:'HOME',
        nav2:'PERSONAL',
        nav3:'ACADEMICS',
        heading:'Introduction',
        content:`<p> Hello! my name is Nithika.<br>I like to paint with pixels and sthoughts in 140 characters or less.<br>I keep up with technology and laugh at funny stuff.<br>Why dont you read my articles ( links on top right corner of webpage).
                </p>
                <br>`
    },
    'article-two' : {
        title:'article-2',
        nav1:'HOME',
        nav2:'INTRODUCTION',
        nav3:'ACADEMICS',
        heading:'Personal',
        content:`
                <p>
                     I love to learn new stuff.
                     I like to dance and paint.
                     I love playing basket ball.
                </p>`
        
    },
    'article-three' : {
        title:'article-3',
        nav1:'HOME',
        nav2:'INTRODUCTION',
        nav3:'PERSONAL',
        heading:'Academics',
        content:`<p>
                    I'm doing  B.Tech Computer Science Engineering.
                </p>
                <br>`
    }
};

function createTemplate(data){
   var title=data.title;
   var heading=data.heading;
   var content=data.content;
   var nav1=data.nav1;
   var nav2=data.nav2;
   var nav3=data.nav3;

     var htmlTemplate=
         `<html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="/ui/style.css"/>
        </head>
        <body>
            <nav id="navigation">
                <ul>
                    <li><a class="link" href="/">${nav1}</a></li>
                    <li><a class="link" href="/ui/article-two">${nav2}</a></li>
                    <li><a class="link" href="/ui/article-three">${nav3}</a></li>
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
 
 var pool= new Pool(config);
 app.get('/test-db',function(err,res){
     pool.query('SELECT * FROM test',function(err,result){
         if (err)
         {
             res.status(500).send(err.toString());
         }
         else
         {
             res.send(JSON.stringify(result.rows));
         }
         
     });
     
 });
 

app.get('/hash/:input',function (req,res) {
    var hashedString = hash(req.params.input,'this-is-some-random-salt-string');
    res.send(hashedString);
});

var counter=0;
app.get('/counter',function(req,res){
 counter=counter+1;
 res.send(`Yo! This page has been visited ${counter} times.`)
})


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/IMG_20141028_013412.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'IMG_20141028_013412.JPG'));
});

app.get('/ui/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/flippingCards',function(req,res){
    res.sendFile(path.join(__dirname,'flipping_cards.html'));
});

app.get('/style_cards.css',function(req,res){
    res.sendFile(path.join(__dirname,'style_cards.css'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
