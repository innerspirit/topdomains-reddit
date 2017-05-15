#!/usr/bin/env node
var getSubPosts = require('./topd.js');
let subs = process.argv.slice(2);

for (var i in subs) {
	getSubPosts(subs[i]).then(logger.bind(subs[i]));
}

function logger(res) {
	console.log(this + ' has these top domains: ' + res.join(','));
}