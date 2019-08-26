//global variables
__ROOTPATH__ = __dirname;


//initiate
require("./modules/babynode/babyNode");
bN.init(8080)//.import(["jQuery"]);

const Game = require('./modules/game/Main');
let game = new Game(IO);

let defaultRoom = game.roomManager.createRoom();

IO.on("connection", function(socket){
	//make sure client version of bN is initiated
	bN.on(socket, "clientReady", function(){

		//start coding!!!
		bN.on(socket, "join", (data)=>{
			socket.join(defaultRoom.id);
			socket.emit('room joined', defaultRoom.id);
			socket.broadcast.to(defaultRoom.id).emit('new join', data);
		})

		//24 ticks
		setInterval(()=>{
			IO.to(defaultRoom.id)
		},1000/24)
		
	});
});





