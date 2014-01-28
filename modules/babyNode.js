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

			_io.addListener("reconnection", this.clientImport);
			return this;
		},
		import: function(pluginName, options){
			var importClass = require("./plugins/"+pluginName);
			var plugin = new importClass(options);
			_plugins[plugin._bN$_name] = importClass;
			route.addExceptions({
				path: __CONF__.jsPath + plugin._bN$_name,
				content: plugin._bN$_clientCode
			});
			return _plugins[plugin._bN$_name];
		},
		clientImport: function(socket) {
			socket.emit("import", route.getExceptions());
		}
	}


	bN = _bN;
}());