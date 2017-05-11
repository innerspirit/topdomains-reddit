let request = require('superagent');
let Promise = this.Promise || require('promise');
let agent = require('superagent-promise')(request, Promise);
let subReddit = process.argv[2];


function getSubPosts(sub) {
  return (agent
    .get('http://reddit.com/r/'+sub+'/hot.json')
    .query({ t: 'week', limit: 10 })
    .set('User-Agent', 'Subfinder bot (by /u/SarasaNews)')
    .end()
    .then(function(res) {
      if (typeof(res.body.data) == 'undefined' || res.body.data.children == "") {
        console.log('There is no subreddit with this name')
        return;
      }
      for (let i in res.body.data.children) {
	      console.log(res.body.data.children[i].data.url);
      }
    }));
}

getSubPosts(subReddit);

