/**
 * Created by richard.smith on 15/10/2015.
 */
/**
 * Created by richard.smith on 06/10/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use('/js', express.static('js'));
//app.use('/styles', express.static('styles/bundle'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/main.html')
});

app.get('/names', function (req, res, next) {

    res.json([
        {'name':'rick'},
        {'name':'jools'},
        {'name':'lou'},
        {'name':'jane'},
        {'name':'bill'},
        {'name':'ail'}
    ]);
});

app.get('/stories', function (req, res, next) {

    res.json([
        {
            "heading": "<h1>A story about something</h1>",
            "chapterUrls": [
                "chapter-1.json",
                "chapter-2.json",
                "chapter-3.json",
                "chapter-4.json",
                "chapter-5.json"
            ]
        }
    ]);
});

app.listen(3000);