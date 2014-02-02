var bN = (function($){
	var _localSocket = 'http://localhost',
		_BRKeoSocket = 'http://192.168.5.126',

	_currentSocket = _localSocket,

	_port = "8080",

	_io;

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
						IO.emit("clientReady");
					}
				}
			}
			
		},
		emit: function(message, data){
			
		}
	}
}(jQuery));

$(document).ready(function(){
	bN.init();
});

