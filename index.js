sw = require('stopword')

function remove_stopwords(str) {
    const oldString = str.split(' ')
    const newString = sw.removeStopwords(oldString)
    return(newString.join(' '))
  }

console.log(remove_stopwords('guardians of galaxy'));
