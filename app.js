//global variables
__ROOTPATH__ = __dirname;





//initiate
require("./modules/babyNode");

bN().init(8080).import("jQuery");




IO.on("connection", function(socket){
	socket.on("init", function(){
		$("body", socket).css({backgroundColor:"green"}).click(function(){
			alert('heheh');
		});
	});
});





