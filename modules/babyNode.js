(function(){
	//a list of plugins got imported
	var _plugins = {}, _io;
	var route = require('./route');
	//jQuery like initiator, simply instanciate the plugin that got imported
	function _bN(selector) {
		if(selector && _plugins[selector]) {
			return new _plugins[selector]();
		} else {
			return _bN.fn; 
		}
	}

	_bN.fn = _bN.prototype = {
		init: function(port){
			var server = require('http').createServer(route.reqHandler);
			IO = _io = require('socket.io').listen(server);
			__CONF__ = _config = require('./config');
			server.listen(8080);
			
			_io.addListener("connection", this.clientImport);

			return this;
		},
		import: function(pluginNames, options){
			
			if(typeof pluginNames == "string"){
				var pluginName = pluginNames;
				var importClass = require("./plugins/"+pluginName);
				var plugin = new importClass(options);
				_plugins[plugin._bN_name] = importClass;
				route.addExceptions({
					path: __CONF__.jsPath + plugin._bN_name + ".js",
					content: plugin._bN_clientCode
				});
			} else {
				for(var i = 0,iLen = pluginNames.length;i<iLen;i++) {
					var pluginName = pluginNames[i];
					var importClass = require("./plugins/"+pluginName);
					var plugin = new importClass(options[pluginName]);
					_plugins[plugin._bN_name] = importClass;
					route.addExceptions({
						path: __CONF__.jsPath + plugin._bN_name + ".js",
						content: plugin._bN_clientCode
					});
				}
			}
			
			return this;
		},
		clientImport: function(socket) {
			socket.emit("import", route.getExceptions());
		}
	}


	bN = _bN;
}());