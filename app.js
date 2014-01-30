//global variables
__ROOTPATH__ = __dirname;





//initiate
require("./modules/babyNode");
bN().init(8080).import("jQuery");




IO.on("connection", function(socket){
	socket.on("clientReady", function(){

		//start coding!!!
		$("body", socket).css({backgroundColor:"green"}).click(function(){
			alert('heheh');
		});
		
	});
});





