var fs = require('fs'),
	url = require("url");

class Router {
	constructor() {
		this.exceptions = [];
		this.queryString = null;
	}

	load404(res) {
		fs.readFile(__ROOTPATH__ + '/www/404.html', function(err, data) {
		  	if (err) {
		    		res.writeHead(500);
		    		res.end('Internal Error! Whoever made this site doesn\'t provide a 404 page... shame on them!!!');
		    		return;
		  	}

		  	res.writeHead(404);
		  	res.end(data);
		});
	}

	addExceptions(o) {
		this.exceptions.push({
			path: o.path,
			content: o.content
		});
	}

	reqHandler(req, res) {
		var uri = url.parse(req.url, true).pathname;

		//get query string
		var queryString = "";
		var urlSearch = url.parse(req.url, true).search;
		if(urlSearch)
			queryString = urlSearch.substr(1).split('&');
		if (queryString != "") {
			this.queryString = {};
			for (var i = 0; i < queryString.length; ++i)
			{
			    var p=queryString[i].split('=');
			    if (p.length != 2) continue;
			    this.queryString[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
		} else {
			this.queryString = {};
		}

		//routing exceptions
		for(var i = 0, iLen = this.exceptions.length; i<iLen; i++) {
			var exeption = this.exceptions[i];
			if(uri == exeption.path) {
				res.writeHead(200);
				var finalContent = String(exeption.content).split('{');
				finalContent.shift();
				finalContent = finalContent.join("{").trim().slice(0, -1);
				res.write(finalContent);
				res.end();
				return;
			}
		}

		//read index.html by default
		var uri = uri.split("/");
		uri.shift();
		if(!uri[uri.length - 1]){
			uri.pop();
		}
		if(uri.length < 1) {
		  	fs.readFile(__ROOTPATH__ + '/www/index.html', (err, data) =>{
		    	if (err) {
		      		this.load404(res);
		      		return;
		    	}

		    	res.writeHead(200);
		    	res.end(data);
		  	});
		} else {
			uri = uri.join("/");
			if(uri.indexOf(".") < 0){
				fs.readFile(__ROOTPATH__ + '/www/'+uri + '/index.html', (err, data) =>{
			    	if (err) {
			      		this.load404(res);
			      		return;
			    	}

			    	res.writeHead(200);
			    	res.end(data);
			  	});
			} else {
				fs.readFile(__ROOTPATH__ + '/www/'+uri, (err, data) =>{
			    	if (err) {
			      		this.load404(res);
			      		return;
			    	}

			    	res.writeHead(200);
			    	res.end(data);
			  	});
			}
			
		}
	}

	getExceptions(){
		return this.exceptions;
	}

	getQueryString(){
		return this.queyString;
	}
}

module.exports = new Router();
