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
        content:`
                 <p> Hello! my name is Nithika.
                 <br>Read my articles to know about me!( links on top right corner of webpage).
                 </p>
                 <br/>
                 <div class=footer>
                 This button <button id="counter">Click me</button>has been clicked <span id="count">0</span> times.
                 <br/>
                 Enter your comments:
                 <br/>
                 <input type=text id="name" placeholder="Enter your comments"></input><br/>
                 <input type=submit value="submit" id="sub_btn"></input>
                 <br>
                 Comments received previously</br>
                 <ul id="nameList">
                 </ul>
                 </div>
                `
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
            <script src="article.js"></script>
        </body>
    </html>`;
    
    return htmlTemplate;
     
 }
 
 function hash(input,salt){
     var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
     return hashed.toString('hex');
 }
 
 app.get('/submit-name', function(req, res){
  
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

 
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
 res.send(counter.toString());
});


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/article.js', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
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
