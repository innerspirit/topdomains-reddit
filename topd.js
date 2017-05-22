let request = require('superagent');
let Promise = this.Promise || require('promise');
let agent = require('superagent-promise')(request, Promise);

module.exports = getSubPosts;

function getSubPosts(sub) {
  return (agent
    .get('http://reddit.com/r/'+sub+'/hot.json')
    .query({ t: 'week', limit: 30 })
    .set('User-Agent', 'Top Domains Bot (by /u/SarasaNews)')
    .end()
    .then(function(res) {
    	if (res.body.data.children == "") {
        return [];
      }
      let cleanDomain = res.body.data.children.filter(selfPost);
      let allDomains = new Set();
      for (let i in cleanDomain) {
       let domain = cleanDomain[i].data.domain;
       allDomains.add(domain);
      }
      return Array.from(allDomains)
    })
    .catch(error)
  );
}

function selfPost(post) {
	return !post.data.domain.startsWith("self.");
}

function error() {
  return [];
}