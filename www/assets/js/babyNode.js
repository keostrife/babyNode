var __CONF__ = {
	speedThreshold: 5 //ms
}

var bN = (function($, config, io){
	var _localSocket = 'http://localhost',
		_BRKeoSocket = 'http://10.120.42.252',

	_currentSocket = _localSocket,

	_port = "8080",

	_io,

	_messages = {};

	return {
		io: io.connect(`${_currentSocket}:${_port}`),
		init: function(callback){
			IO  = bN.io;
			IO.on("init", (data)=>{
				bN.import(data,callback)
			});
		},
		import: function(data, callback){
			data = data || {importLinks:[]};
			var imports = data.importLinks;
			if(!imports || !imports.length) {
				bN.emit("clientReady");
				callback();
			}
			for(var i = 0, iLen = imports.length; i<iLen;i++) {
				var link = imports[i].path;
				var script = document.createElement('script');
				script.src = link;
				document.head.appendChild(script);
				if(i == iLen - 1){
					script.onload = function(){
						bN.emit("clientReady");
						callback();
					}
				}
			}
			__CONF__.speedThreshold = data.speedLimit;
			
		},
		emit: function(message, data){
			_messages[message] = _messages[message] || {};

			if(_messages[message].timeout) {
				clearTimeout(_messages[message].timeout);
				_messages[message].timeout = setTimeout(function(){
					IO.emit(message, data);
				}, config.speedThreshold);
			} else {
				_messages[message].timeout = setTimeout(function(){
					IO.emit(message, data);
				}, config.speedThreshold);
			}
		},
		on: function(message, handler) {
			IO.on(message, function(data){
				handler(data);
			});
		}
	}
}(jQuery, __CONF__, io));



