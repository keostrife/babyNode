//global variables
__ROOTPATH__ = __dirname;


//initiate
require("./modules/babyNode");
bN.init(8080).import(["jQuery","dbAsync"]);



IO.on("connection", function(socket){
	bN.on(socket, "clientReady", function(){

		//start coding!!!
		$("body", socket).css({backgroundColor:"green"}).click(function(){
			alert('heheh');
		});
		
	});

	bN.on(socket, "test", function(){
		console.log('heh');
	});

	bN.on(socket, "test2", function(){
		console.log('hoh');
	});
});





