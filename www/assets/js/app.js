var __CONF__ = {
	speedThreshold: 5 //ms
}

var bN = (function($, config){
	var _localSocket = 'http://localhost',
		_BRKeoSocket = 'http://192.168.5.126',

	_currentSocket = _localSocket,

	_port = "8080",

	_io,

	_messages = {};

	return {
		io: io.connect(_currentSocket),
		init: function(){
			IO  = bN.io;
			IO.on("import", bN.import);
		},
		import: function(data){
			for(var i = 0, iLen = data.length; i<iLen;i++) {
				var link = data[i].path;
				var script = document.createElement('script');
				script.src = link;
				document.head.appendChild(script);
				if(i == iLen - 1){
					script.onload = function(){
						bN.emit("clientReady");
					}
				}
			}
			
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
		}
	}
}(jQuery, __CONF__));

$(document).ready(function(){
	bN.init();
});

