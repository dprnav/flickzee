var client = require('./connection.js');

client.indices.delete({index: 'movie'},function(err,resp,status) {  
  console.log("delete",resp);
});
