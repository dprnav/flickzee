var express=require('express');
var app=express();
var client = require('./connection.js');
var url = require('url');
var sw = require('stopword')

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

function remove_stopwords(str) {
    const oldString = str.split(' ')
    const newString = sw.removeStopwords(oldString)
    return(newString.join(' '))
}

app.get('/',function(req,res){
res.render('index.html');
});

app.get('/search', (req, res) => {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  client.search({
    index: 'movie',
    type: 'movies',
    body: {
      from: 0,
      size : 10,
      query: {
        match: {
          MovieName: {
            query: remove_stopwords(query.query)
          }
        }
      },
    }
  },function (error, response,status) {
      var result = '[';
      if (error){
      }
      else {
        response.hits.hits.forEach(function(hit){
          if (result != '['){
            result += ','
          }
          result += JSON.stringify(hit._source);
        })
        result += ']'
        res.send(result);
      }
  });
});

var server=app.listen(80,function(){
console.log("We have started our server on port 3000");
});
