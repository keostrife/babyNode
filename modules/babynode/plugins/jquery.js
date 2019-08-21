/* Sample of a plugin
 *
 */

function _convertToText(input) {
    var string = [];

    //is object
    if (typeof(input) == "object" && (input.join == undefined)) {
        string.push("{");
        for (prop in input) {
            string.push(prop, ": ", _convertToText(input[prop]), ",");
        };
        string.push("}");

    //is array
    } else if (typeof(input) == "object" && !(input.join == undefined)) {
        string.push("[")
        for(prop in input) {
            string.push(_convertToText(input[prop]), ",");
        }
        string.push("]")

    //is function
    } else if (typeof(input) == "function") {
        string.push(input.toString())

    } else if (typeof(input) == "string"){
        string.push("'"+input+"'")
    }

    return string.join("")
}

//options are arguments passed down when plugin 
function jQuery(selector, ...args) {
	//last argument always is the socket
	this.socket = args.pop();
	this.selector = selector;

	return new Proxy(this, {
		get: function(obj, prop){
			if(obj[prop]) return obj[prop];
			return function() {
				var selectorArgs = [" "];
				var methodArgs = []
				for(let g = 0; g<args.length; g++)
					selectorArgs.push(_convertToText(args[g]));

				for(let g = 0; g<arguments.length; g++)
					methodArgs.push(_convertToText(arguments[g]));

				this.socket.emit("jQuery", 
					`$('${this.selector}'${selectorArgs.length?`${selectorArgs.join(",")}`:""}).${prop}(${methodArgs.join(",")});`
				);

				return this;
			}
		}
	});

	
}




jQuery.prototype = {
	_bN_name: "jQuery",
	_bN_clientCode: function(){
		//this code will go to client
		IO.on("jQuery", function(data){
			eval(data);
		});
	},
	_bN_init: function(){
		//this function will get run automatically after the class is instanciated
	}
}

global.$ = function(selector, socket){
	return new jQuery(selector, socket);
}

module.exports = jQuery;

