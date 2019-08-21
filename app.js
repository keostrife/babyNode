//global variables
__ROOTPATH__ = __dirname;


//initiate
require("./modules/babynode/babyNode");
bN.init(8080).import(["jQuery"]);



IO.on("connection", function(socket){
	//make sure client version of bN is initiated
	bN.on(socket, "clientReady", function(){

		//start coding!!!
		$("body", socket).css({backgroundColor:"green"}).click(function(){
			alert('heheh');
		});
		
	});
});





