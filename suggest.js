var client = require('./connection.js');

client.suggest({
  index: 'movie',
  type: 'movies',
  body: {
    query: {
      match: {
        MovieName: {
          query: 'ironman'
        }
      }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});
