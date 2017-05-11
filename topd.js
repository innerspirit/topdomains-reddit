let request = require('superagent');
let Promise = this.Promise || require('promise');
let agent = require('superagent-promise')(request, Promise);
let subReddit = process.argv[2];

function getSubPosts(sub) {
  return (agent
    .get('http://reddit.com/r/'+sub+'/hot.json')
    .query({ t: 'week', limit: 20 })
    .set('User-Agent', 'Subfinder bot (by /u/SarasaNews)')
    .end()
    .then(function(res) {
    	if (res.body.data.children == "") {
        console.log('There is no subreddit with this name')
        return;
      	}
    	let SelfDomain = res.body.data.children.filter(selfPost);
    	let TwitterDomain = SelfDomain.filter(twitter);
    	let cleanDomain = TwitterDomain.filter(github);
      	for (let i in cleanDomain) {
	      let domain = cleanDomain[i].data.domain;
	      console.log(domain);
      	}
    })
    .catch(console.log.bind(console))
    );
}

//-----------filters-----------
function selfPost(post) {
	return post.data.domain !== "self.PHP";
}
function twitter(post) {
	return post.data.domain !== "twitter.com";
}
function github(post) {
	return post.data.domain !== "github.com";
}

getSubPosts(subReddit);